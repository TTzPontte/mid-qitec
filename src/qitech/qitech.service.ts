import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')
var dateFormat = require('dateformat');
const QITtech = require('qitech-wrapper');

@Injectable()
export class QitechService {

   constructor(private readonly configService: ConfigService) { }

   qitech_wrapper = QITtech({
      clientKey: this.configService.get('config.QITECH_CLIENTKEY'),
      privateKey: this.configService.get('config.QITECH_PRIVATEKEY'),
      publicKey: this.configService.get('config.QITECH_PUBLICKEY')
   });

   public async createDebt(data) {
      let qitechResponse: any;
      try {
         qitechResponse = await this.qitech_wrapper.debt.post(data);
         console.log(qitechResponse.decoded)
         return qitechResponse.decoded
      } catch (error) {
         console.error(error.decoded);
      }
   }

   public async createAccount(data) {
      let qitechResponse: any;

      try {
         qitechResponse = await this.qitech_wrapper.escrow.post(data);
         console.log(qitechResponse.decoded);

         return qitechResponse.decoded;
      } catch (error) {
         console.error(error.decoded);
      }
   }

   async upload(fileContent) {

      let qitechResponse

      try {
         qitechResponse = await this.qitech_wrapper.upload.post(fileContent);
         console.log('qitechResponse.decoded');
         console.log(qitechResponse.decoded);
         return qitechResponse.decoded;
      } catch (error) {
         console.error(error.decoded);
         return { document_key: null, document_md5: null };
      }


   }

   async debit(payload) {

      payload = {
         "borrower": {
            "address": {
               "city": "Teresina",
               "complement": "complemento",
               "neighborhood": "Gurupi",
               "number": "6080",
               "postal_code": "64091210",
               "state": "PI",
               "street": "Br 343"
            },
            "cnae_code": "6499-9/99",
            "company_document_number": "89940878025962",
            "company_representatives": [
               {
                  "address": {
                     "city": "Recife",
                     "complement": null,
                     "neighborhood": "Fundão",
                     "number": "137",
                     "postal_code": "52221110",
                     "state": "PE",
                     "street": "Rua Camapuã"
                  },
                  "birth_date": "1972-02-02",
                  "document_identification_number": "339122924",
                  "email": "pedro.alves@yopmail.com",
                  "individual_document_number": "94632180173",
                  "is_pep": false,
                  "marital_status": "single",
                  "mother_name": "Sueli Isadora Alves",
                  "name": "Pedro Felipe Henrique Alves",
                  "nationality": "Brasileira",
                  "person_type": "natural",
                  "phone": {
                     "area_code": "88",
                     "country_code": "055",
                     "number": "995924634"
                  },
                  "profession": "Empresário",
                  "property_system": null,
                  "spouse": null,
                  "wedding_certificate": null,
                  "document_identification": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235",
                  "proof_of_residence": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235"
               }
            ],
            "company_statute": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235",
            "company_type": "ltda",
            "directors_election_minute": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235",
            "email": "parmalat@yopmail.com",
            "foundation_date": "2012-01-01",
            "name": "Parmalat",
            "person_type": "legal",
            "phone": {
               "area_code": "11",
               "country_code": "055",
               "number": "999999999"
            },
            "trading_name": "Parmalat"
         },
         "guarantors": [
            {
               "person_type": "natural",
               "name": "Patrícia Tereza Bernardes",
               "mother_name": "Maria Mariane",
               "birth_date": "1990-05-06",
               "profession": "Deputada",
               "nationality": "Brasileira",
               "marital_status": "married",
               "is_pep": true,
               "property_system": "total_communion_of_goods",
               "individual_document_number": "34651104630",
               "document_identification_number": "232479719",
               "email": "patricia.tereza@yopmail.com",
               "phone": {
                  "country_code": "055",
                  "area_code": "11",
                  "number": "9128281359"
               },
               "address": {
                  "street": "Passagem Mariana",
                  "state": "PA",
                  "city": "Ananindeua",
                  "neighborhood": "Águas Lindas",
                  "number": "660",
                  "postal_code": "67118003",
                  "complement": "complemento"
               },
               "spouse": null,
               "wedding_certificate": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235",
               "document_identification": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235",
               "proof_of_residence": "0f8f2cd0-207c-41f6-9eaa-b6fe5bf28235"
            }
         ],
         "disbursement_bank_accounts": [
            {
               "bank_code": "341",
               "branch_number": "7071",
               "account_number": "15570",
               "account_digit": "4",
               "document_number": "94632180173",
               "name": "Pedro Felipe Henrique Alves",
               "percentage_receivable": 100
            }
         ],
         "financial": {
            "amount": 10000000,
            "annual_interest_rate": 2.32,
            "cdi_percentage": 100,
            "credit_operation_type": "ccb",
            "disbursement_date": "2021-11-25",
            "issue_date": "2021-11-25",
            "fine_configuration": {
               "contract_fine_rate": 0.02,
               "interest_base": "calendar_days",
               "monthly_rate": 0.01
            },
            "interest_grace_period": 0,
            "interest_type": "cdi_plus",
            "number_of_installments": 10,
            "principal_grace_period": 0,
            "rebates": [
               {
                  "fee_type": "tac",
                  "amount_type": "absolute",
                  "amount": 500
               }
            ]
         },
         "purchaser_document_number": "49194383000175"
      }
      let qitechResponse;
      try {
         qitechResponse = await this.qitech_wrapper.debt.post(payload);
         console.log('qitechResponse.decoded');
         console.log(qitechResponse.decoded);
      } catch (err) {
         console.error(err.decoded)
      }
   }

}
