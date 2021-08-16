import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { QitechDto } from './dto/qitech.dto';
import * as fs from 'fs';
import { single } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Repository } from 'typeorm';
import { EscrowService } from 'src/escrow/escrow.service';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')
var dateFormat = require('dateformat');



@Injectable()
export class QitechService {

  constructor(
    @InjectRepository(Escrow)
    private escrowRepository: Repository<Escrow>,
  ) { }

  API_CLIENT_KEY: string = '3fb54232-00c3-44c1-bd99-883f3c50da46';
  private CLIENT_PRIVATE_KEY = fs.readFileSync('/opt/pontte/arquivos/jwtECDSASHA512.key');

  getDestinationList(escrow) {
    let destination_list = [];
    escrow.escrowAccountDestinationList.forEach(e => {
      destination_list.push({
        "account_branch": e.account_branch,
        "account_digit": e.account_digit,
        "account_number": e.account_digit,
        "document_number": e.account_digit,
        "financial_institutions_code_number": e.account_digit,
        "name": e.account_digit
      });
    });
    return destination_list;
  }

  getAccountOwner(escrow) {
    return {
      "address": {
        "city": escrow.escrowAccountOwnerList[0].address_city,
        "complement": escrow.escrowAccountOwnerList[0].address_complement,
        "neighborhood": escrow.escrowAccountOwnerList[0].address_neighborhood,
        "number": escrow.escrowAccountOwnerList[0].address_number,
        "postal_code": escrow.escrowAccountOwnerList[0].address_postal_code,
        "state": escrow.escrowAccountOwnerList[0].address_state,
        "street": escrow.escrowAccountOwnerList[0].address_street
      },
      "birth_date": dateFormat(escrow.escrowAccountOwnerList[0].birth_date, "yyyy-MM-dd"),
      "document_identification": escrow.escrowAccountOwnerList[0].document_identification_attach,
      "email": escrow.escrowAccountOwnerList[0].email,
      "individual_document_number": escrow.escrowAccountOwnerList[0].individual_document_number,
      "is_pep": escrow.escrowAccountOwnerList[0].is_pep,
      "mother_name": escrow.escrowAccountOwnerList[0].mother_name,
      "name": escrow.escrowAccountOwnerList[0].name,
      "nationality": escrow.escrowAccountOwnerList[0].nationality,
      "person_type": escrow.escrowAccountOwnerList[0].person_type,
      "phone": {
        "country_code": escrow.escrowAccountOwnerList[0].phone_country_code,
        "area_code": escrow.escrowAccountOwnerList[0].phone_area_code,
        "number": escrow.escrowAccountOwnerList[0].phone_number
      },
      "proof_of_residence": escrow.escrowAccountOwnerList[0].proof_of_residence_attach
    }

  }

  getAccountManagerList(escrow) {
    let company_representatives = [];
    escrow.escrowAccountManagerList[0].escrowAccountManagerRepresentativeList.forEach(e => {
      company_representatives.push({
        "address": {
          "city": e.address_city,
          "complement": e.address_complement,
          "neighborhood": e.address_neighborhood,
          "number": e.address_number,
          "postal_code": e.address_postal_code,
          "state": e.address_state,
          "street": e.address_street
        },
        "birth_date": dateFormat(e.birth_date, "yyyy-MM-dd"),
        "document_identification": e.document_identification_attach,
        "email": e.email,
        "individual_document_number": e.individual_document_number,
        "is_pep": e.is_pep,
        "mother_name": e.mother_name,
        "name": e.name,
        "nationality": e.nationality,
        "person_type": e.person_type,
        "phone": {
          "area_code": e.phone_area_code,
          "country_code": e.phone_country_code,
          "number": e.phone_number
        },
        "proof_of_residence": e.proof_of_residence_attach
      });

    });

    return {
      "account_manager": {
        "address": {
          "city": escrow.escrowAccountManagerList[0].address_city,
          "complement": escrow.escrowAccountManagerList[0].address_complement,
          "neighborhood": escrow.escrowAccountManagerList[0].address_neighborhood,
          "number": escrow.escrowAccountManagerList[0].address_number,
          "postal_code": escrow.escrowAccountManagerList[0].address_postal_code,
          "state": escrow.escrowAccountManagerList[0].address_state,
          "street": escrow.escrowAccountManagerList[0].address_street
        },
        "cnae_code": escrow.escrowAccountManagerList[0].cnae_code,
        "company_document_number": escrow.escrowAccountManagerList[0].company_document_number,
        "company_representatives": company_representatives,
        "company_statute": escrow.escrowAccountManagerList[0].company_statute_attach,
        "directors_election_minute": escrow.escrowAccountManagerList[0].directors_election_minute,
        "email": escrow.escrowAccountManagerList[0].email,
        "foundation_date": dateFormat(escrow.escrowAccountManagerList[0].foundation_date, "yyyy-MM-dd"),
        "name": escrow.escrowAccountManagerList[0].name,
        "person_type": escrow.escrowAccountManagerList[0].person_type,
        "phone": {
          "area_code": escrow.escrowAccountManagerList[0].phone_area_code,
          "country_code": escrow.escrowAccountManagerList[0].phone_country_code,
          "number": escrow.escrowAccountManagerList[0].phone_number
        },
        "trading_name": escrow.escrowAccountManagerList[0].trading_name
      },
    }


  }

  async createEscrowAccount(){
    const listEscrowPending = await this.findByStatus("123");//validar status
    let list = [];
    listEscrowPending.forEach(escrow => {

      let escrowRequest = {
        destination_list: this.getDestinationList(escrow),
        account_manager: this.getAccountManagerList(escrow),
        account_owner: this.getAccountOwner(escrow)
      }

      //chamar 

      let resp = this.createAccount(escrowRequest);//testar com dados reais
      //validar response
      //salvar se deu bom
      console.log(escrowRequest);
      list.push(escrowRequest);
    });

    return list;
  }

  public async createAccount(data): Promise<string> {

    const QITtech = require('qitech-wrapper');
    let qitech_wrapper = QITtech({
      clientKey: "3fb54232-00c3-44c1-bd99-883f3c50da46",
      privateKey: "/opt/pontte/arquivos/jwtECDSASHA512.key",
      publicKey: "/opt/pontte/arquivos/jwtECDSASHA512.key.pub"
    });

    let qitechResponse: any;

    try {
      qitechResponse = await qitech_wrapper.escrow.post(data);
      console.log(qitechResponse.decoded);

    } catch (error) {
      console.error(error.decoded);
    }

    return qitechResponse.decoded;
  }


  async uploadDocument(escrow){
    const listEscrowPending = await this.findByStatus("123");//validar status

    listEscrowPending.forEach(escrow => {
      //verificar quais documentos existem
      //efetuar upload dos arquivos
      //salvar document_key nas tabelas correspondentes
    });



  }

  async findByStatus(status: string) {
    return await this.escrowRepository.createQueryBuilder("escrow")
      .leftJoinAndSelect("escrow.escrowAccountDestinationList", "escrowAccountDestination")
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect("escrow.escrowAccountManagerList", "escrowAccountManager")
      .leftJoinAndSelect("escrow.escrowAccountOwnerList", "escrowAccountOwner")
      .leftJoinAndSelect("escrowAccountManager.escrowAccountManagerRepresentativeList", "escrowAccountManagerRepresentative")
      .where("escrow.status = :status", { status })
      .getMany();
  }

  generateHash = data => {
    return crypto
      .createHash('md5')
      .update(data)
      .digest('hex');
  }

  generateSignature = (method, endpoint, contentType, hash) => {
    const now = new Date().toUTCString();
    const sign = method + '\n' + hash + '\n' + contentType + '\n' + now + '\n' + endpoint;
    console.log(sign);
    return sign;
  }

  generateEncodedBody = body => {
    return jwt.sign({ ...body }, this.CLIENT_PRIVATE_KEY, { algorithm: 'ES512', noTimestamp: true });
  };

  request = async (param) => {
    try {
      const res = await this.sendRequest(param);
      console.log(res);
      const encoded_body = res.data.encoded_body;

      const decode = jwt.decode(encoded_body);
      console.log(decode);
    } catch (error) {
      console.log('ERRO');
      // console.error(error);
      const encoded_body = error.data.encoded_body;
      const decode = jwt.decode(encoded_body);
      console.log(decode);
    }

  }

  sendRequest = async ({ body, header, endpoint, isFormData = false }) => {
    const API_URL = "https://api-auth.sandbox.qitech.app";
    if (isFormData) {
      header['Content-Type'] = `multipart/form-data; boundary=${body._boundary}`;
    }
    return await axios.post(API_URL + endpoint, body, { headers: header });
  };


  upload = async () => {
    const formData = new FormData();
    const file = fs.readFileSync('/opt/pontte/arquivos/arquivoTexto.txt');
    formData.append("file", file);

    const bodyJWT = {
      "sub": this.API_CLIENT_KEY,
      "signature": this.generateSignature("POST", "/upload", "application/json", this.generateHash(file))
    }

    console.log(bodyJWT);

    const request = {
      body: formData,
      header: {
        "API-CLIENT-KEY": this.API_CLIENT_KEY,
        "Authorization": "QIT " + this.API_CLIENT_KEY + ":" + this.generateEncodedBody(bodyJWT)
      },
      endpoint: "/upload",
      isFormData: true
    }

    await this.request(request);

  }

}
