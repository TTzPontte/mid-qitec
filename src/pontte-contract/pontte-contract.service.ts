import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from "@nestjs/typeorm";
import { DebtsService } from 'src/debts/debts.service';
import { DebtDto } from 'src/debts/dto/debt.dto';
import { DebtEntity } from 'src/debts/entities/Debt.entity';
import { EscrowAccountManagerDto } from 'src/escrow/dto/escrow-account-manager.dto';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { ManagerStatusEnum } from 'src/escrow/enum/manager-status';
import { StatusEnum } from 'src/escrow/enum/status';
import { EscrowService } from 'src/escrow/escrow.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { QitechService } from 'src/qitech/qitech.service';
import { Repository } from "typeorm";
import { PontteContract } from './entites/pontte-contract.entity';
let dateFormat = require('dateformat');
const fs = require('fs');
var base64 = require('base-64');

@Injectable()
export class PontteContractService {

  constructor(
    @InjectRepository(PontteContract)
    private pontteRepository: Repository<PontteContract>,
    private readonly qitechService: QitechService,
    private readonly escrowService: EscrowService,
    private readonly googleDriveService: GoogleDriveService,
    private readonly configService: ConfigService,
    private readonly debtsService: DebtsService
  ) { }

  async saveEscrowAndDebt(payload: DebtDto) {
    //ajustar payload
    let debt = await this.debtsService.create(payload);

    let escrow = await this.escrowService.escrowConverter(payload);
    let escrowEntity = await this.escrowService.create(escrow);

    let pontteContractDto = {
      debt,
      escrow: escrowEntity,
      name: debt.borrower.fullName,
      amount: debt.financial.amount,
      documentNumber: debt.borrower.documentIdentificationNumber
    };

    this.createPontteContract(pontteContractDto);
    // this.escrowService.escrowConverter(payload);
  }

  async createDebtQiTech(debt: DebtEntity) {
    // enviar para qitech

    let debt2 = await this.debtsService.findOne(debt.id);

    this.uploadDocumentDebt(debt2);//VALIDAR

    //updateDocumentos

    let resp = await this.qitechService.createDebt(debt2);
    console.log('createDebtQiTech');
    console.log(resp);

    let { data } = resp;

    if (data) {
      //precis salvar algum retorno?
      //numero cci, ipoc
      //status
      console.log(data);
      debt.status = StatusEnum.REVIEW;
      await this.debtsService.updateDebt(debt2);
      return true;
    }
  }


  async initializeContract() {

    ///validar se existe manager cadastrado
    let accountManager = await this.escrowService.findManagerByStatus(ManagerStatusEnum.ACTIVE);
    if (!accountManager) {
      return "Manager not found.";
    }


    const listPontteContractPending = await this.findListByStatus(StatusEnum.NEW);
    console.log(listPontteContractPending);
    await Promise.all(listPontteContractPending.map(async (contract) => {

      console.log("initializeContract");
      console.log("contract.escrow");
      console.log(contract.escrow);
      console.log("contract.debt");
      console.log(contract.debt);

      if (await this.createEscrowAccountQiTech(contract.escrow)) {
        // await this.createDebtQiTech(contract.debt);
        //validar retorno antes de salvar
        contract.status = StatusEnum.REVIEW;
        contract.updateDate = new Date();
        this.updateContract(contract);
      };

    }))
  }

  async createEscrowAccountQiTech(escrowPending: Escrow) {

    console.log("createEscrowAccountQiTech");
    console.log(escrowPending);
    //upload
    this.uploadDocument(escrowPending);

    if (this.validateDocumentOk(escrowPending)) {

      let escrowRequest = {
        destination_list: this.getDestinationList(escrowPending),
        account_manager: await this.getAccountManagerList(),
        account_owner: this.getAccountOwner(escrowPending),
      }

      let allowed_User = this.getAllowedUser(escrowPending)//validar se é PJ

      if (allowed_User) {
        escrowRequest['allowed_User'] = allowed_User;
      }

      let resp = await this.qitechService.createAccount(escrowRequest);
      //validar response
      //salvar se deu bom
      console.log('validateDocumentOk');
      console.log(resp);
      let { data } = resp;

      if (data) {
        console.log(data);
        escrowPending.accountBranch = data.account_info.account_branch;
        escrowPending.accountNumber = data.account_info.account_number;
        escrowPending.financialInstitutionCode = data.account_info.financial_institution_code;
        //digito
        escrowPending.status = StatusEnum.REVIEW;
        this.escrowService.updateEscrow(escrowPending);
        return true;
      }

    }
    return false;
  }

  getDestinationList(escrow) {
    let destination_list = [];
    escrow.destinationAccounts.forEach(e => {
      destination_list.push({
        "account_branch": e.accountBranch,
        "account_digit": e.accountDigit,
        "account_number": e.accountNumber,
        "document_number": e.documentNumber,
        "financial_institutions_code_number": e.financialInstitutionsCodeNumber,
        "name": e.name
      });
    });
    return destination_list;
  }

  getAccountOwner(escrow) {
    if (escrow.accountOwner.type == "natural") {
      return this.getAccountOwnerPF(escrow);
    } else if (escrow.accountOwner.type == "PJ") {
      return this.getAccountOwnerPJ(escrow);
    }

  }

  getAccountOwnerPF(escrow) {
    return {
      "address": {
        "city": escrow.accountOwner.addressCity,
        "complement": escrow.accountOwner.addressComplement,
        "neighborhood": escrow.accountOwner.addressNeighborhood,
        "number": escrow.accountOwner.addressNumber,
        "postal_code": escrow.accountOwner.addressPostalCode,
        "state": escrow.accountOwner.addressState,
        "street": escrow.accountOwner.addressStreet
      },
      "birth_date": dateFormat(escrow.accountOwner.birthDate, "yyyy-mm-dd"),
      "document_identification": escrow.accountOwner.documentIdentificationAttachNumber,
      "email": escrow.accountOwner.email,
      "individual_document_number": escrow.accountOwner.individualDocumentNumber.replace(/[^0-9]+/g, ""),
      "is_pep": escrow.accountOwner.isPep,
      "mother_name": escrow.accountOwner.motherName,
      "name": escrow.accountOwner.name,
      "nationality": escrow.accountOwner.nationality,
      "person_type": escrow.accountOwner.personType,
      "phone": {
        "country_code": escrow.accountOwner.phoneCountryCode.replace(/[^0-9]+/g, "0"),
        "area_code": escrow.accountOwner.phoneAreaCode,
        "number": escrow.accountOwner.phoneNumber.replace(/[^0-9]+/g, "")
      },
      "proof_of_residence": escrow.accountOwner.proofOfResidenceAttachNumber
    }

  }

  getAccountOwnerPJ(escrow) {

    let company_representatives = [];
    escrow.accountManager.accountManagerRepresentativeList.forEach(e => {

      company_representatives.push({
        "address": {
          "city": e.addressCity,
          "complement": e.addressComplement,
          "neighborhood": e.addressNeighborhood,
          "number": e.addressNumber,
          "postal_code": e.addressPostalCode,
          "state": e.addressState,
          "street": e.addressStreet
        },
        "birth_date": dateFormat(e.birthDate, "yyyy-mm-dd"),
        "document_identification": e.documentIdentificationAttach,
        "email": e.email,
        "individual_document_number": e.individualDocumentNumber.replace(/[^0-9]+/g, ""),
        "is_pep": e.isPep,
        "mother_name": e.motherName,
        "name": e.name,
        "nationality": e.nationality,
        "person_type": e.personType,
        "phone": {
          "area_code": e.phoneAreaCode,
          "country_code": e.phoneCountryCode.replace(/[^0-9]+/g, "0"),
          "number": e.phoneNumber.replace(/[^0-9]+/g, "")
        },
        "proof_of_residence": e.proofOfResidenceAttach
      });

    });

    return {
      "address": {
        "city": escrow.accountOwner.addressCity,
        "complement": escrow.accountOwner.addressComplement,
        "neighborhood": escrow.accountOwner.addressNeighborhood,
        "number": escrow.accountOwner.addressNumber,
        "postal_code": escrow.accountOwner.addressPostalCode,
        "state": escrow.accountOwner.addressState,
        "street": escrow.accountOwner.addressStreet
      },
      "cnae_code": escrow.accountOwner.cnaeCode,
      "company_document_number": escrow.accountOwner.companyDocumentNumber,
      "company_representatives": company_representatives,
      "company_statute": escrow.accountOwner.companyStatute,
      "directors_election_minute": escrow.accountOwner.directorsElectionMinute,
      "email": escrow.accountOwner.email,
      "foundation_date": dateFormat(escrow.accountOwner.foundationDate, "yyyy-mm-dd"),
      "name": escrow.accountOwner.name,
      "person_type": escrow.accountOwner.personType,
      "phone": {
        "area_code": escrow.accountOwner.phoneAreaCode,
        "country_code": escrow.accountOwner.phoneCountryCode.replace(/[^0-9]+/g, "0"),
        "number": escrow.accountOwner.phoneNumber.replace(/[^0-9]+/g, "")
      },
      "trading_name": escrow.accountOwner.tradingName
    }

  }

  getAllowedUser(escrow) {

    if (escrow.accountOwner.type == "PJ") {
      return {
        "email": escrow.accountManager.email,
        "individual_document_number": escrow.accountManager.individualDocumentNumber.replace(/[^0-9]+/g, ""),
        "name": escrow.accountManager.name,
        "person_type": escrow.accountManager.personType,
        "phone": {
          "area_code": escrow.accountManager.phoneAreaCode,
          "country_code": escrow.accountManager.phoneCountryCode.replace(/[^0-9]+/g, "0"),
          "number": escrow.accountManager.phoneNumber.replace(/[^0-9]+/g, "")
        }
      }
    } else {
      return null;
    }
  }

  async getAccountManagerList() {
    let accountManager = await this.escrowService.findManagerByStatus(ManagerStatusEnum.ACTIVE);
    //buscar manager na base
    let company_representatives = [];
    accountManager.accountManagerRepresentativeList.forEach(e => {
      company_representatives.push({
        "address": {
          "city": e.addressCity,
          "complement": e.addressComplement,
          "neighborhood": e.addressNeighborhood,
          "number": e.addressNumber,
          "postal_code": e.addressPostalCode.replace(/[^0-9]+/g, ""),
          "state": e.addressState,
          "street": e.addressStreet
        },
        "birth_date": dateFormat(e.birthDate, "yyyy-mm-dd"),
        "document_identification": e.documentIdentificationAttachNumber,
        "email": e.email,
        "individual_document_number": e.individualDocumentNumber.replace(/[^0-9]+/g, ""),
        "is_pep": e.isPep,
        "mother_name": e.motherName,
        "name": e.name,
        "nationality": e.nationality,
        "person_type": e.personType,
        "phone": {
          "area_code": e.phoneAreaCode,
          "country_code": e.phoneCountryCode.replace(/[^0-9]+/g, "0"),
          "number": e.phoneNumber.replace(/[^0-9]+/g, "")
        },
        "proof_of_residence": e.proofOfResidenceAttachNumber
      });

    });
    return {
      "address": {
        "city": accountManager.addressCity,
        "complement": accountManager.addressComplement,
        "neighborhood": accountManager.addressNeighborhood,
        "number": accountManager.addressNumber,
        "postal_code": accountManager.addressPostalCode,
        "state": accountManager.addressState,
        "street": accountManager.addressStreet
      },
      "cnae_code": accountManager.cnaeCode,
      "company_document_number": accountManager.companyDocumentNumber,
      "company_representatives": company_representatives,
      "company_statute": accountManager.companyStatuteAttachNumber,
      "directors_election_minute": accountManager.directorsElectionMinuteAttachNumber,
      "email": accountManager.email,
      "foundation_date": dateFormat(accountManager.foundationDate, "yyyy-mm-dd"),
      "name": accountManager.name,
      "person_type": accountManager.personType,
      "phone": {
        "area_code": accountManager.phoneAreaCode,
        "country_code": accountManager.phoneCountryCode.replace(/[^0-9]+/g, "0"),
        "number": accountManager.phoneNumber.replace(/[^0-9]+/g, "")
      },
      "trading_name": accountManager.tradingName,
      // --
      // "mother_name":"Maria Mariane",
      // "birth_date": "2001-01-01",
      "birth_date": dateFormat(accountManager.birthDate, "yyyy-mm-dd"),
      "document_identification": "3caa440e-6b4f-4567-90e2-32a9c3ee7bb0",
      "individual_document_number": "08141163701",
      "is_pep": false,
      "mother_name": accountManager.motherName,
      "nationality": accountManager.nationality,
      "proof_of_residence": "3caa440e-6b4f-4567-90e2-32a9c3ee7bb0"

    }

  }

  validateDocumentOk(escrow) {

    let documentOk = true;

    if (escrow.accountOwner.type == "natural") {//VERIFICAR SE VAI PRECISAR FAZER UPLOAD DOS DOCUMENTOS PARA ACCOUNT MANAGER VISTO Q ESTARA FIXO EM UM ARQUIVO DE CONFIG
      if (!escrow.accountOwner.documentIdentificationAttachNumber) documentOk = false;
      if (!escrow.accountOwner.proofOfResidenceAttachNumber) documentOk = false;
    } else if (escrow.accountOwner.type == "PJ") {


      if (!escrow.accountOwner.companyStatuteAttach) documentOk = false;
      if (!escrow.accountOwner.directorsElectionMinute) documentOk = false;
      escrow.accountOwner.accountManagerRepresentativeList.forEach(accountManagerRepresentative => {
        if (!accountManagerRepresentative.documentIdentificationAttach) documentOk = false;
        if (!accountManagerRepresentative.proofOfResidenceAttach) documentOk = false;

      })
    } else {
      documentOk = false;
    }

    return documentOk;

  }

  async uploadDocument(escrow) {
    // let docs;

    //buscar scrowAccontOwner
    console.log("uploadDocument")
    if (escrow.accountOwner.proofOfResidenceAttach && !escrow.accountOwner.proofOfResidenceAttachNumber) {
      escrow.accountOwner.proofOfResidenceAttachNumber = await this.uploadDocumentQiTech("accountOwner", escrow.accountOwner.proofOfResidenceAttach, escrow.accountOwner.proofOfResidenceAttachTypeFile);
      console.log(escrow.accountOwner.proofOfResidence);
    }
    if (escrow.accountOwner.documentIdentificationAttach && !escrow.accountOwner.documentIdentificationAttachNumber) {
      escrow.accountOwner.documentIdentificationAttachNumber = await this.uploadDocumentQiTech("accountOwner", escrow.accountOwner.documentIdentificationAttach, escrow.accountOwner.documentIdentificationAttachTypeFile);
    }
    if (escrow.accountOwner.companyStatuteAttach && !escrow.accountOwner.companyStatute) {
      escrow.accountOwner.companyStatute = await this.uploadDocumentQiTech("accountOwner", escrow.accountOwner.companyStatuteAttach, escrow.accountOwner.companyStatuteAttachTypeFile);
    }

    this.escrowService.updateAccountOwner(escrow.accountOwner);

  }

  async uploadDocumentDebt(debt: DebtEntity) {
    // let docs;

    //buscar scrowAccontOwner
    console.log("uploadDocumentDebt")
    debt.borrower.proofOfResidence;
    debt.borrower.documentIdentification;
    debt.borrower.weddingCertificate;

    if (debt.borrower.proofOfResidence && !debt.borrower.proofOfResidenceAttachNumber) {
      debt.borrower.proofOfResidenceAttachNumber = await this.uploadDocumentQiTech("debt", debt.borrower.proofOfResidence, debt.borrower.proofOfResidenceAttachTypeFile);
    }
    if (debt.borrower.documentIdentification && !debt.borrower.documentIdentificationAttachNumber) {
      debt.borrower.documentIdentificationAttachNumber = await this.uploadDocumentQiTech("debt", debt.borrower.documentIdentification, debt.borrower.weddingCertificateAttachTypeFile);
    }
    if (debt.borrower.weddingCertificate && !debt.borrower.weddingCertificateAttachNumber) {
      debt.borrower.weddingCertificateAttachNumber = await this.uploadDocumentQiTech("debt", debt.borrower.weddingCertificate, debt.borrower.weddingCertificateAttachTypeFile);
    }

    this.debtsService.updateBorrower(debt.borrower);

  }


  async uploadDocumentQiTech(fileId, file, typeFile) {

    let dt = new Date().getTime();

    fs.writeFileSync(`${this.configService.get('config.FILE_FOLDER')}/${dt}.${typeFile}`, file,
      function (err) { console.log(err); }
    );

    const { document_key, document_md5 } = await this.qitechService.upload(`${this.configService.get('config.FILE_FOLDER')}/${dt}.${typeFile}`);
    console.log("document_key");
    console.log(document_key);

    return document_key;
  }


  async deleteFile(fileId, typeFile) {
    const folder = this.configService.get('config.GOOGLE_DRIVE_FOLDER');

    fs.stat(`${folder}/${fileId}.pdf`, function (err, stats) {
      console.log(stats);//here we got all information of file in stats variable

      if (err) {
        return console.error(err);
      }

      fs.unlink(`${folder}/${fileId}.pdf`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    });
  }

  async createPontteContract(pontteContractDto) {
    let contract = new PontteContract();
    Object.assign(contract, pontteContractDto);

    contract.status = StatusEnum.NEW;
    contract.createDate = new Date;

    console.log('contract');
    console.log(contract);
    contract = await this.pontteRepository.save(contract);
    return contract;
  }



  async findListByStatus(status: number) {
    return await this.pontteRepository.createQueryBuilder("pontteContract")
      .leftJoinAndSelect("pontteContract.escrow", "escrow")
      .leftJoinAndSelect("pontteContract.debt", "debt")
      // .leftJoinAndSelect("escrow.accountManager", "accountManager")
      .leftJoinAndSelect("escrow.accountOwner", "accountOwner")
      .leftJoinAndSelect("escrow.destinationAccounts", "destinationAccounts")
      // .leftJoinAndSelect("accountManager.accountManagerRepresentativeList", "accountManagerRepresentativeList")

      .leftJoinAndSelect("pontteContract.debt", "borrower")
      .leftJoinAndSelect("pontteContract.debt", "disbursementAccount")
      .leftJoinAndSelect("pontteContract.debt", "financial")
      .leftJoinAndSelect("pontteContract.debt", "externalContractFees")


      .where("escrow.status = :status", { status })
      .getMany();
  }

  async updateContract(contract: PontteContract) {
    return await this.pontteRepository.save(contract);
  }


  async saveEscrowAccountManager(accontManagerDto: EscrowAccountManagerDto) {
    let accountManager = new EscrowAccountManager();
    // let accountManager = new EscrowAccountManager();
    Object.assign(accountManager, accontManagerDto);
    //upload documentos
    accountManager = await this.escrowService.documentsAccountManager(accountManager, accontManagerDto);

    accountManager = await this.escrowService.saveEscrowAccountManager(accountManager);

    await this.uploadDocumentsAccountManager(accountManager);
  }


  async uploadDocumentsAccountManager(accountManager: EscrowAccountManager,) {

    accountManager.accountManagerRepresentativeList.forEach(async element => {
      if (element.proofOfResidenceAttach) {
        element.proofOfResidenceAttachNumber = await this.uploadDocumentQiTech("accountManager", element.proofOfResidenceAttach, element.proofOfResidenceAttachTypeFile);
      }
      if (element.documentIdentificationAttach) {
        element.documentIdentificationAttachNumber = await this.uploadDocumentQiTech("accountManager", element.documentIdentificationAttach, element.documentIdentificationAttachTypeFile);
      }

    });

    if (accountManager.documentIdentificationAttach) {
      accountManager.documentIdentificationAttachNumber = await this.uploadDocumentQiTech("accountManager", accountManager.documentIdentificationAttach, accountManager.documentIdentificationAttachTypeFile);
    }
    if (accountManager.directorsElectionMinuteAttach) {
      accountManager.directorsElectionMinuteAttachNumber = await this.uploadDocumentQiTech("accountManager", accountManager.directorsElectionMinuteAttach, accountManager.directorsElectionMinuteAttachTypeFile);
    }
    if (accountManager.proofOfResidenceAttach) {
      accountManager.proofOfResidenceAttachNumber = await this.uploadDocumentQiTech("accountManager", accountManager.proofOfResidenceAttach, accountManager.proofOfResidenceAttachTypeFile);
    }
    if (accountManager.companyStatuteAttach) {
      accountManager.companyStatuteAttachNumber = await this.uploadDocumentQiTech("accountManager", accountManager.companyStatuteAttach, accountManager.companyStatuteAttachTypeFile);
    }


    this.escrowService.updateAccountManager(accountManager);
  }



}
