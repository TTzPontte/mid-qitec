import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from "@nestjs/typeorm";
import { DebtsService } from '../debts/debts.service';
import { DebtDto } from '../debts/dto/debt.dto';
import { DebtEntity } from '../debts/entities/Debt.entity';
import { Escrow } from '../escrow/entities/escrow.entity';
import { StatusEnum } from '../escrow/enum/status';
import { EscrowService } from '../escrow/escrow.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { QitechService } from '../qitech/qitech.service';
import { Repository } from "typeorm";
import { PontteContractDto } from './dto/PontteContractDto';
import { PontteContract } from './entites/pontte-contract.entity';
let dateFormat = require('dateformat');
const fs = require('fs');

@Injectable()
export class PontteContractService {

  constructor(
    @InjectRepository(PontteContract)
    private pontteRepository: Repository<PontteContract>,
    private readonly escrowService: EscrowService,
    private readonly qitechService: QitechService,
    private readonly googleDriveService: GoogleDriveService,
    private readonly configService: ConfigService,
    private readonly debtsService: DebtsService
  ) { }

  async saveEscrowAndDebit(payload: DebtDto) {
    //ajustar payload
    let debit = await this.debtsService.create(payload);

    let escrow = await this.escrowService.escrowConverter(payload);
    let escrowEntity =  await this.escrowService.create(escrow);

    let pontteContractDto = {
      debit,
      escrow: escrowEntity,
      name: debit.borrower.fullName,
      amount: debit.financial.amount,
      documentNumber: debit.borrower.documentIdentificationNumber
    };

    this.createPontteContract(pontteContractDto);
    // this.escrowService.escrowConverter(payload);
  }

  async createDebitQiTech(debit: DebtEntity) {
    //buscar por status
    // const listDebtsPending = await this.debtsService.findByStatus(StatusEnum.NEW);
    //precisa validar algo?

    // await Promise.all(listDebtsPending.map(async (debit) => {
    // enviar para qitech
    let resp = await this.qitechService.createDebt(debit);
    console.log('resp');
    console.log(resp);
    let { data } = resp;

    if (data) {
      //precis salvar algum retorno?
      //numero cci, ipoc
      //status
      console.log(data);
      debit.status = StatusEnum.REVIEW;
      this.debtsService.updateDebit(debit);
    }

    // }))

  }


  async initializeContract() {
    const listPontteContractPending = await this.findListByStatus(StatusEnum.NEW);

    await Promise.all(listPontteContractPending.map(async (contract) => {
      this.createEscrowAccountQiTech(contract.escrow);
      this.createDebitQiTech(contract.debit);

      contract.status = StatusEnum.REVIEW;
      contract.updateDate = new Date();
      this.updateContract(contract);

    }))
  }

  async createEscrowAccountQiTech(escrowPending: Escrow) {
    // const listEscrowPending = await this.escrowService.findListByStatus(StatusEnum.NEW);//validar status

    // await Promise.all(listEscrowPending.map(async (escrowPending) => {
    //upload
    this.uploadDocument(escrowPending);

    if (this.validateDocumentOk(escrowPending)) {

      let escrowRequest = {
        destination_list: this.getDestinationList(escrowPending),
        account_manager: this.getAccountManagerList(escrowPending),
        account_owner: this.getAccountOwner(escrowPending),
      }

      let allowed_User = this.getAllowedUser(escrowPending)//validar se é PJ

      if (allowed_User) {
        escrowRequest['allowed_User'] = allowed_User;
      }

      let resp = await this.qitechService.createAccount(escrowRequest);//testar com dados reais
      //validar response
      //salvar se deu bom
      console.log('resp');
      console.log(resp);
      let { data } = resp;

      if (data) {
        console.log(data);
        escrowPending.accountBranch = data.account_info.account_branch;
        escrowPending.accountNumber = data.account_info.account_number;
        //digito
        escrowPending.status = StatusEnum.REVIEW;
        this.escrowService.updateEscrow(escrowPending);
      }

    }

    // }
    // ))
  }

  getDestinationList(escrow) {
    let destination_list = [];
    escrow.escrowAccountDestinationList.forEach(e => {
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
    if (escrow.escrowAccountOwner.type == "PF") {
      return this.getAccountOwnerPF(escrow);
    } else if (escrow.escrowAccountOwner.type == "PJ") {
      return this.getAccountOwnerPJ(escrow);
    }

  }

  getAccountOwnerPF(escrow) {
    return {
      "address": {
        "city": escrow.escrowAccountOwner.addressCity,
        "complement": escrow.escrowAccountOwner.addressComplement,
        "neighborhood": escrow.escrowAccountOwner.addressNeighborhood,
        "number": escrow.escrowAccountOwner.addressNumber,
        "postal_code": escrow.escrowAccountOwner.addressPostalCode,
        "state": escrow.escrowAccountOwner.addressState,
        "street": escrow.escrowAccountOwner.addressStreet
      },
      "birth_date": dateFormat(escrow.escrowAccountOwner.birthDate, "yyyy-mm-dd"),
      "document_identification": escrow.escrowAccountOwner.documentIdentificationAttach,
      "email": escrow.escrowAccountOwner.email,
      "individual_document_number": escrow.escrowAccountOwner.individualDocumentNumber,
      "is_pep": escrow.escrowAccountOwner.isPep,
      "mother_name": escrow.escrowAccountOwner.motherName,
      "name": escrow.escrowAccountOwner.name,
      "nationality": escrow.escrowAccountOwner.nationality,
      "person_type": escrow.escrowAccountOwner.personType,
      "phone": {
        "country_code": escrow.escrowAccountOwner.phoneCountryCode,
        "area_code": escrow.escrowAccountOwner.phoneAreaCode,
        "number": escrow.escrowAccountOwner.phoneNumber
      },
      "proof_of_residence": escrow.escrowAccountOwner.proofOfResidenceAttach
    }

  }

  getAccountOwnerPJ(escrow) {

    let company_representatives = [];
    escrow.escrowAccountManager.escrowAccountManagerRepresentativeList.forEach(e => {

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
        "individual_document_number": e.individualDocumentNumber,
        "is_pep": e.isPep,
        "mother_name": e.motherName,
        "name": e.name,
        "nationality": e.nationality,
        "person_type": e.personType,
        "phone": {
          "area_code": e.phoneAreaCode,
          "country_code": e.phoneCountryCode,
          "number": e.phoneNumber
        },
        "proof_of_residence": e.proofOfResidenceAttach
      });

    });

    return {
      "address": {
        "city": escrow.escrowAccountOwner.addressCity,
        "complement": escrow.escrowAccountOwner.addressComplement,
        "neighborhood": escrow.escrowAccountOwner.addressNeighborhood,
        "number": escrow.escrowAccountOwner.addressNumber,
        "postal_code": escrow.escrowAccountOwner.addressPostalCode,
        "state": escrow.escrowAccountOwner.addressState,
        "street": escrow.escrowAccountOwner.addressStreet
      },
      "cnae_code": escrow.escrowAccountOwner.cnaeCode,
      "company_document_number": escrow.escrowAccountOwner.companyDocumentNumber,
      "company_representatives": company_representatives,
      "company_statute": escrow.escrowAccountOwner.companyStatute,
      "directors_election_minute": escrow.escrowAccountOwner.directorsElectionMinute,
      "email": escrow.escrowAccountOwner.email,
      "foundation_date": dateFormat(escrow.escrowAccountOwner.foundationDate, "yyyy-mm-dd"),
      "name": escrow.escrowAccountOwner.name,
      "person_type": escrow.escrowAccountOwner.personType,
      "phone": {
        "area_code": escrow.escrowAccountOwner.phoneAreaCode,
        "country_code": escrow.escrowAccountOwner.phoneCountryCode,
        "number": escrow.escrowAccountOwner.phoneNumber
      },
      "trading_name": escrow.escrowAccountOwner.tradingName
    }

  }

  getAllowedUser(escrow) {

    if (escrow.escrowAccountOwner.type == "PJ") {
      return {
        "email": escrow.escrowAccountManager.email,
        "individual_document_number": escrow.escrowAccountManager.individualDocumentNumber,
        "name": escrow.escrowAccountManager.name,
        "person_type": escrow.escrowAccountManager.personType,
        "phone": {
          "area_code": escrow.escrowAccountManager.phoneAreaCode,
          "country_code": escrow.escrowAccountManager.phoneCountryCode,
          "number": escrow.escrowAccountManager.phoneNumber
        }
      }
    } else {
      return null;
    }
  }

  getAccountManagerList(escrow) {
    let company_representatives = [];
    escrow.escrowAccountManager.escrowAccountManagerRepresentativeList.forEach(e => {
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
        "individual_document_number": e.individualDocumentNumber,
        "is_pep": e.isPep,
        "mother_name": e.motherName,
        "name": e.name,
        "nationality": e.nationality,
        "person_type": e.personType,
        "phone": {
          "area_code": e.phoneAreaCode,
          "country_code": e.phoneCountryCode,
          "number": e.phoneNumber
        },
        "proof_of_residence": e.proofOfResidenceAttach
      });

    });
    return {
      "address": {
        "city": escrow.escrowAccountManager.addressCity,
        "complement": escrow.escrowAccountManager.addressComplement,
        "neighborhood": escrow.escrowAccountManager.addressNeighborhood,
        "number": escrow.escrowAccountManager.addressNumber,
        "postal_code": escrow.escrowAccountManager.addressPostalCode,
        "state": escrow.escrowAccountManager.addressState,
        "street": escrow.escrowAccountManager.addressStreet
      },
      "cnae_code": escrow.escrowAccountManager.cnaeCode,
      "company_document_number": escrow.escrowAccountManager.companyDocumentNumber,
      "company_representatives": company_representatives,
      "company_statute": escrow.escrowAccountManager.companyStatuteAttach,
      "directors_election_minute": escrow.escrowAccountManager.directorsElectionMinute,
      "email": escrow.escrowAccountManager.email,
      "foundation_date": dateFormat(escrow.escrowAccountManager.foundationDate, "yyyy-mm-dd"),
      "name": escrow.escrowAccountManager.name,
      "person_type": escrow.escrowAccountManager.personType,
      "phone": {
        "area_code": escrow.escrowAccountManager.phoneAreaCode,
        "country_code": escrow.escrowAccountManager.phoneCountryCode,
        "number": escrow.escrowAccountManager.phoneNumber
      },
      "trading_name": escrow.escrowAccountManager.tradingName

    }

  }

  validateDocumentOk(escrow) {

    let documentOk = true;

    if (!escrow.escrowAccountOwner.companyStatuteAttach) documentOk = false;
    if (!escrow.escrowAccountOwner.proofOfResidenceAttach) documentOk = false;
    // if (!escrow.escrowAccountOwner.directorsElectionMinute) documentOk = false;

    if (escrow.escrowAccountManager.type == "PF") {//VERIFICAR SE VAI PRECISAR FAZER UPLOAD DOS DOCUMENTOS PARA ACCOUNT MANAGER VISTO Q ESTARA FIXO EM UM ARQUIVO DE CONFIG
      if (!escrow.escrowAccountManager.documentIdentificationAttach) documentOk = false;
      if (!escrow.escrowAccountManager.proofOfResidenceAttach) documentOk = false;
    } else if (escrow.escrowAccountManager.type == "PJ") {
      //pj
      if (!escrow.escrowAccountManager.companyStatuteAttach) documentOk = false;
      if (!escrow.escrowAccountManager.directorsElectionMinute) documentOk = false;
      escrow.escrowAccountManager.escrowAccountManagerRepresentativeList.forEach(accountManagerRepresentative => {
        if (!accountManagerRepresentative.documentIdentificationAttach) documentOk = false;
        if (!accountManagerRepresentative.proofOfResidenceAttach) documentOk = false;

      })
    }

    return documentOk;

  }

  async uploadDocument(escrow) {
    let docs;

    if (escrow.escrowAccountOwner.type == "PF") {
      docs = await this.getFilesByDocument(escrow.escrowAccountOwner.individualDocumentNumber);
    } else if (escrow.escrowAccountOwner.type == "PJ") {
      docs = await this.getFilesByDocument(escrow.escrowAccountOwner.companyDocumentNumber);
    }

    if (docs) {
      this.uploadDocumentAccountOwner(escrow.escrowAccountOwner, docs);
      this.uploadDocumentAccountManager(escrow.escrowAccountManager, docs);
    }


  }

  async uploadDocumentAccountOwner(accountOwner, docs) {
    let companyStatuteAttach, proofOfResidenceAttach, documentIdentificationAttach;
    await Promise.all(docs.map(async (element) => {
      // docs.forEach(async element => {
      if (element.name == 'company_statute') {
        companyStatuteAttach = await this.getFileByParentFolderId(element.id);
        if (!accountOwner.companyStatuteAttach) accountOwner.companyStatuteAttach = companyStatuteAttach['DATA'];
        this.escrowService.updateAccountOwner(accountOwner);
      }
      if (element.name == 'proof_of_residence') {
        proofOfResidenceAttach = await this.getFileByParentFolderId(element.id);
        if (!accountOwner.proofOfResidenceAttach) accountOwner.proofOfResidenceAttach = proofOfResidenceAttach['DATA'];
        this.escrowService.updateAccountOwner(accountOwner);
      }
      if (element.name == 'document_identification') {
        documentIdentificationAttach = await this.getFileByParentFolderId(element.id);
        if (!accountOwner.documentIdentificationAttach) accountOwner.documentIdentificationAttach = documentIdentificationAttach['DATA'];
        this.escrowService.updateAccountOwner(accountOwner);
      }
    }));

  }

  async uploadDocumentAccountManager(accountManager, docs) {
    let documentIdentificationAttach, proofOfResidenceAttach, companyStatuteAttach, directorsElectionMinute;
    await Promise.all(docs.map(async (element) => {
      if (element.name == 'document_identification') {
        documentIdentificationAttach = this.getFileByParentFolderId(element.id);
        if (!accountManager.documentIdentificationAttach) accountManager.documentIdentificationAttach = documentIdentificationAttach['DATA'];
        this.escrowService.updateAccountManager(accountManager);
      }
      if (element.name == 'proof_of_residence') {
        proofOfResidenceAttach = this.getFileByParentFolderId(element.id);
        if (!accountManager.proofOfResidenceAttach) accountManager.proofOfResidenceAttach = proofOfResidenceAttach['DATA'];
        this.escrowService.updateAccountManager(accountManager);
      }
      if (element.name == 'company_statute') {
        companyStatuteAttach = this.getFileByParentFolderId(element.id);
        if (!accountManager.companyStatuteAttach) accountManager.companyStatuteAttach = companyStatuteAttach['DATA'];
        this.escrowService.updateAccountManager(accountManager);
      }
      if (element.name == 'directors_election_minute') {
        directorsElectionMinute = this.getFileByParentFolderId(element.id);
        if (!accountManager.directorsElectionMinute) accountManager.directorsElectionMinute = directorsElectionMinute['DATA'];
        this.escrowService.updateAccountManager(accountManager);
      }

    }));


    if (accountManager.type == "PJ") {
      //pj
      accountManager.escrowAccountManagerRepresentativeList.forEach(accountManagerRepresentative => {
        this.uploadDocumentAccountManagerRepresentative(accountManagerRepresentative);
      })
    }

  }

  async uploadDocumentAccountManagerRepresentative(accountManagerRepresentative) {
    let docs = await this.getFilesByDocument(accountManagerRepresentative.document_identification)

    let documentIdentificationAttach, proofOfResidenceAttach;
    if (docs)
      await Promise.all(docs.map(async (element) => {
        if (element.name == 'document_identification') {
          documentIdentificationAttach = await this.getFileByParentFolderId(element.id);
          if (!accountManagerRepresentative.documentIdentificationAttach) accountManagerRepresentative.documentIdentificationAttach = documentIdentificationAttach['DATA'];
          this.escrowService.updateAccountManagerRepresentative(accountManagerRepresentative);
        }

        if (element.name == 'proof_of_residence') {
          proofOfResidenceAttach = await this.getFileByParentFolderId(element.id);
          if (!accountManagerRepresentative.proofOfResidenceAttach) accountManagerRepresentative.proofOfResidenceAttach = proofOfResidenceAttach['DATA'];
          this.escrowService.updateAccountManagerRepresentative(accountManagerRepresentative);
        }
      }));

  }

  async uploadDocumentQiTech(path) {
    const { document_key, document_md5 } = await this.qitechService.upload(path);
    return document_key;
  }

  async getFilesByDocument(docNumber) {
    let pageToken, id, resp = null;

    do {
      resp = await this.googleDriveService.getFilesFromDrive(`mimeType='application/vnd.google-apps.folder' and '${this.configService.get('config.ROOT_FOLDER_ID')}' in parents`, pageToken);
      if (resp.files) {
        pageToken = resp.nextPageToken;
        id = await resp.files.map(folder => {
          let { name, id } = folder;

          let documentNumber = name.split('_')
          documentNumber = documentNumber[0].replace(/[^0-9]+/g, '');
          if (docNumber == documentNumber) {
            return id;
          }
        });
      }
      if (!resp.nextPageToken) break;

    } while (id[0] == undefined)

    console.log(id);
    if (id[0] != undefined) {
      pageToken = null;
      let data = await this.googleDriveService.getFilesFromDrive(`mimeType='application/vnd.google-apps.folder' and '${id[0]}' in parents`, pageToken);//lista de pastas dentro da pasta do cpf especifico
      if (data) return data.files;
    }

  }


  async getFileByParentFolderId(folderId) {
    const data = await this.googleDriveService.getFilesFromDrive(`mimeType!='application/vnd.google-apps.folder' and '${folderId}' in parents`, null);//arquivo

    if (data.files.length > 0) {
      let { id } = data.files[0];

      let response = await this.googleDriveService.downloadFileById(id);

      if (response['ID']) {
        response['DATA'] = await this.uploadQiTechAttach(response['ID']);
      }
      return response;
    }
  }

  async uploadQiTechAttach(fileId) {
    const documentKey = await this.uploadDocumentQiTech(`${this.configService.get('config.GOOGLE_DRIVE_FOLDER')}/${fileId}.pdf`);//VERIFICAR SE TODOS OS ARQUIVOS SÃO PDF
    this.deleteFile(fileId);
    console.log('fileId');
    console.log(fileId);

    return documentKey;
  }

  async deleteFile(fileId) {
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
      .leftJoinAndSelect("pontteContract.debit", "debit")
      .where("escrow.status = :status", { status })
      .getMany();
  }

  async updateContract(contract: PontteContract) {
    return await this.pontteRepository.save(contract);
  }

  async teste (){
    this.qitechService.debit(null);
  }


}
