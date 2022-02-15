import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InstallmentDto } from 'src/debts/dto/Installment.dto';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')
var dateFormat = require('dateformat');
const QITtech = require('qitech-wrapper');
const fs = require('fs');
var path = require("path");

@Injectable()
export class QitechService {

   constructor(private readonly configService: ConfigService) { }

   public async createDebt(data) {

      let qitech_wrapper = QITtech({
         clientKey: this.configService.get('config.QITECH_CLIENTKEY'),
         privateKey: this.configService.get('config.QITECH_PRIVATEKEY'),
         publicKey: this.configService.get('config.QITECH_PUBLICKEY')
      });

      let qitechResponse: any;
      try {
         console.log('createDebt')
         console.log(data)

         let borrower = data.borrower;
         borrower.weddingCertificate = borrower.weddingCertificatea;
         borrower.documentIdentification = data.borrower.documentIdentificationAttachNumber;
         borrower.proofOfResidence = data.borrower.proofOfResidenceAttachNumber;

         let request = {
            installments: data.installments,
            borrower: data.borrower,
            financial: data.financial
         };

         qitechResponse = await qitech_wrapper.debt.post(JSON.stringify(request));
         console.log('qitechResponse')
         console.log(qitechResponse)
         return qitechResponse.decoded
      } catch (error) {
         console.error(error.decoded);
      }
   }

   public async createAccount(data) {
      let qitechResponse: any;
      let qitech_wrapper = QITtech({
         clientKey: this.configService.get('config.QITECH_CLIENTKEY'),
         privateKey: this.configService.get('config.QITECH_PRIVATEKEY'),
         publicKey: this.configService.get('config.QITECH_PUBLICKEY')
      });

      try {
         console.log("------------------------------");
         console.log(data);
         qitechResponse = await qitech_wrapper.escrow.post(data);
         console.log(qitechResponse.decoded);

         return qitechResponse.decoded;
      } catch (error) {
         console.error(error);
      }
   }

   async upload(fileContent) {

      let qitechResponse

      let qitech_wrapper = QITtech({
         clientKey: this.configService.get('config.QITECH_CLIENTKEY'),
         privateKey: this.configService.get('config.QITECH_PRIVATEKEY'),
         publicKey: this.configService.get('config.QITECH_PUBLICKEY')
      });

      try {
         qitechResponse = await qitech_wrapper.upload.post( fileContent);
         console.log('qitechResponse.decoded');
         console.log(qitechResponse.decoded);
         return qitechResponse.decoded;
      } catch (error) {
         console.log(error);
         return { document_key: null, document_md5: null };
      }

   }

   async downloadFile(fileId){
      var file = fs.createWriteStream(`${this.configService.get('config.FILE_FOLDER')}/${fileId}.pdf`);
   }

}
