import { Injectable } from '@nestjs/common';
import { pairs } from 'rxjs';
import { StatusEnum } from 'src/escrow/enum/status';
import { EscrowService } from 'src/escrow/escrow.service';
import { QitechService } from 'src/qitech/qitech.service';
let dateFormat = require('dateformat');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

@Injectable()
export class PontteContractService {
  api_key = {
    key: 'AIzaSyC1CfF4rvVbXqbtKzAMxf188G9EEd7mQB4'
  }



  pathDocs = '/opt/pontte/arquivos/teste.pdf'//BUSCAR O DOCUMENTO ESPECIFICO PARA CADA UM


  constructor(
    private readonly escrowService: EscrowService,
    private readonly qitechService: QitechService
  ) { }

  async createEscrowAccount() {
    const escrowPending = await this.escrowService.findByStatus(StatusEnum.NEW);//validar status
    //testar com lista
    let list = [];
    // listEscrowPending.forEach(escrow => {
    if (this.validateDocumentOk(escrowPending)) {

      let escrowRequest = {
        destination_list: this.getDestinationList(escrowPending),
        account_manager: this.getAccountManagerList(escrowPending),
        account_owner: this.getAccountOwner(escrowPending)
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
        console.log(data);
        escrowPending.accountBranch = data.account_info.account_branch;
        escrowPending.accountNumber = data.account_info.account_number;
        escrowPending.status = StatusEnum.APPROVED;
        this.escrowService.updateEscrow(escrowPending);
      }

    }

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

  validateDocumentOk(escrow) {//verificar onde sera chamado

    let documentOk = true;

    if (!escrow.escrowAccountOwner.companyStatuteAttach) documentOk = false;
    if (!escrow.escrowAccountOwner.proofOfResidenceAttach) documentOk = false;
    // if (!escrow.escrowAccountOwner.directorsElectionMinute) documentOk = false;

    if (escrow.escrowAccountManager.type == "PF") {
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

  async uploadDocument() {
    const listEscrowPending = await this.escrowService.findListByStatus(StatusEnum.NEW);//validar status

    await Promise.all(listEscrowPending.map(async (escrow) => {

      console.log(escrow);
      let docs = [];
      if (escrow.escrowAccountOwner.type == "PF") {
        docs = await this.getFilesByDocument(escrow.escrowAccountOwner.individualDocumentNumber);
      } else if (escrow.escrowAccountOwner.type == "PJ") {
        docs = await this.getFilesByDocument(escrow.escrowAccountOwner.companyDocumentNumber);
      }
  
      this.uploadDocumentAccountOwner(escrow.escrowAccountOwner, docs);
      this.uploadDocumentAccountManager(escrow.escrowAccountManager, docs);


    }));


    // listEscrowPending.forEach(escrow => {

    // console.log(escrow);
    // let docs = [];
    // if (escrow.escrowAccountOwner.type == "PF") {
    //   docs = await this.getFilesByDocument(escrow.escrowAccountOwner.individualDocumentNumber);
    // } else if (escrow.escrowAccountOwner.type == "PJ") {
    //   docs = await this.getFilesByDocument(escrow.escrowAccountOwner.companyDocumentNumber);
    // }

    // this.uploadDocumentAccountOwner(escrow.escrowAccountOwner, docs);
    // this.uploadDocumentAccountManager(escrow.escrowAccountManager, docs);
    // });

  }

  async uploadDocumentAccountOwner(accountOwner, docs) {
    let companyStatuteAttach, proofOfResidenceAttach, documentIdentificationAttach;
    docs.forEach(element => {
      if (element.name == 'company_statute') {
        companyStatuteAttach = this.getFileByParendFolderId(element.id);
      }
      if (element.name == 'proof_of_residence') {
        proofOfResidenceAttach = this.getFileByParendFolderId(element.id);
      }
      if (element.name == 'document_identification') {
        documentIdentificationAttach = this.getFileByParendFolderId(element.id);
      }
    });

    if (!accountOwner.companyStatuteAttach) accountOwner.companyStatuteAttach = companyStatuteAttach;
    if (!accountOwner.proofOfResidenceAttach) accountOwner.proofOfResidenceAttach = proofOfResidenceAttach;
    if (!accountOwner.documentIdentificationAttach) accountOwner.documentIdentificationAttach = documentIdentificationAttach;
    this.escrowService.updateAccountOwner(accountOwner);
  }

  separatedDocs

  async uploadDocumentAccountManager(accountManager, docs) {
    let documentIdentificationAttach, proofOfResidenceAttach, companyStatuteAttach, directorsElectionMinute;
    docs.array.forEach(element => {

      if (element.name == 'document_identification') {
        documentIdentificationAttach = this.getFileByParendFolderId(element.id);
      }
      if (element.name == 'proof_of_residence') {
        proofOfResidenceAttach = this.getFileByParendFolderId(element.id);
      }
      if (element.name == 'company_statute') {
        companyStatuteAttach = this.getFileByParendFolderId(element.id);
      }
      if (element.name == 'directors_election_minute') {
        directorsElectionMinute = this.getFileByParendFolderId(element.id);
      }

    });

    //pf
    if (accountManager.type == "PF") {
      if (!accountManager.documentIdentificationAttach) accountManager.documentIdentificationAttach = await this.uploadDocumentQiTech(this.pathDocs);
      if (!accountManager.proofOfResidenceAttach) accountManager.proofOfResidenceAttach = await this.uploadDocumentQiTech(this.pathDocs);
    } else if (accountManager.type == "PJ") {
      //pj
      if (!accountManager.companyStatuteAttach) accountManager.companyStatuteAttach = await this.uploadDocumentQiTech(this.pathDocs);
      if (!accountManager.directorsElectionMinute) accountManager.directorsElectionMinute = await this.uploadDocumentQiTech(this.pathDocs);
      accountManager.escrowAccountManagerRepresentativeList.forEach(accountManagerRepresentative => {
        this.uploadDocumentAccountManagerRepresentative(accountManagerRepresentative);
      })
    }

    this.escrowService.updateAccountManager(accountManager);
  }

  async uploadDocumentAccountManagerRepresentative(accountManagerRepresentative) {
    let docs = await this.getFilesByDocument(accountManagerRepresentative.document_identification)

    let documentIdentificationAttach, proofOfResidenceAttach;
    docs.forEach(element => {
      if (element.name == 'document_identification') {
        documentIdentificationAttach = this.getFileByParendFolderId(element.id);
      }

      if (element.name == 'proof_of_residence') {
        proofOfResidenceAttach = this.getFileByParendFolderId(element.id);
      }
    });

    if (!accountManagerRepresentative.documentIdentificationAttach) accountManagerRepresentative.documentIdentificationAttach = documentIdentificationAttach;
    if (!accountManagerRepresentative.proofOfResidenceAttach) accountManagerRepresentative.proofOfResidenceAttach = proofOfResidenceAttach;
    this.escrowService.updateAccountManagerRepresentative(accountManagerRepresentative);
  }

  async uploadDocumentQiTech(path) {
    const { document_key, document_md5 } = await this.qitechService.upload(path);
    return document_key;
  }

  async getDrive() {

  }

  async getFilesFromDrive(query): Promise<any> {
    let credentialRawdata = fs.readFileSync('/opt/pontte/arquivos/vegapontte-c37fda9c7b54.json');
    let credentials = JSON.parse(credentialRawdata);

    const client = await google.auth.getClient({
      credentials,
      scopes: 'https://www.googleapis.com/auth/drive',
    });

    const drive = await google.drive({ version: 'v3', auth: client, });

    const res = await drive.files.list({
      pageSize: 1000,
      includeTeamDriveItems: true,
      supportsTeamDrives: true,
      q: query,
      fields: 'nextPageToken, files(id, name, parents)',

    });
    return res.data.files;
  }

  // 02108308000180
  async getFilesByDocument(docNumber) {
    const folderId = '12prrnSQu4UDoxSaTzMMxkSchUWDJ-5H4';//pasta raiz

    let folders = await this.getFilesFromDrive(`mimeType='application/vnd.google-apps.folder' and '${folderId}' in parents`);
    let id = await folders.map(folder => {
      let { name, id } = folder;

      let documentNumber = name.split('_')
      documentNumber = documentNumber[0].replace(/[^0-9]+/g, '');
      if (docNumber == documentNumber) {
        return id;
      }
    });
    console.log(id);

    return await this.getFilesFromDrive(`mimeType='application/vnd.google-apps.folder' and '${id}' in parents`);//lista de pastas dentro da pasta do cpf especifico

  }

  async getFileByParendFolderId(folderId) {
    const files = await this.getFilesFromDrive(`mimeType!='application/vnd.google-apps.folder' and '${folderId}' in parents`);//arquivo

    if (files.length > 0) {
      let { id } = files[0];
       return await this.downloadFileById(id);
    }
  }


  async downloadFileById(fileId) {
    let credentialRawdata = fs.readFileSync('/opt/pontte/arquivos/vegapontte-c37fda9c7b54.json');
    let credentials = JSON.parse(credentialRawdata);
    const returnData = [];
    const client = await google.auth.getClient({
      credentials,
      scopes: 'https://www.googleapis.com/auth/drive',
    });

    const drive = await google.drive({ version: 'v3', auth: client, });

    var dest = fs.createWriteStream(`/opt/${fileId}.pdf`);

    await drive.files.get(
      { fileId: fileId, alt: 'media', },
      { responseType: 'stream' }, (err, res) => {
        if (err) {
          returnData.push(["ERR"]);
          returnData.push("" + err);
          console.log(err);
        } else {
           res.data.pipe(dest);
          returnData.push("Downloaded");
        }
      });
      
      returnData['DATA'] = this.getLocalFile(fileId);
    return returnData;
  }

  async getLocalFile(fileId) {
    const file = await fs.readFileSync(`/opt/${fileId}.pdf`);
    if(file){
      const documentKey = await this.uploadDocumentQiTech(file);

      fs.unlink(`/opt/${fileId}.pdf`, function (err){
        if (err) throw err;
        console.log('Arquivo deletado!');
    })


      return documentKey;
    }
  }

}
