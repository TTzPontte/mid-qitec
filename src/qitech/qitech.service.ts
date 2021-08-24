import { Injectable } from '@nestjs/common';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')
var dateFormat = require('dateformat');
const QITtech = require('qitech-wrapper');
import config from 'src/config/config'

@Injectable()
export class QitechService {

   qitech_wrapper = QITtech({
    clientKey: config.QITECH_CLIENTKEY,
    privateKey: config.QITECH_PRIVATEKEY,
    publicKey: config.QITECH_PUBLICKEY
  });

  public async createAccount(data) {

    let qitechResponse: any;

    try {
      qitechResponse = await this.qitech_wrapper.escrow.post(data);
      console.log(qitechResponse.decoded);

    } catch (error) {
      console.error(error.decoded);
    }
    console.log(qitechResponse.decoded);
    return qitechResponse.decoded;
  }

  async upload(fileContent) {

    let qitechResponse;

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

}
