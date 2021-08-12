import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { QitechDto } from './dto/qitech.dto';
import * as fs from 'fs';
import { single } from 'rxjs';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')



@Injectable()
export class QitechService {
  API_CLIENT_KEY: string = '3fb54232-00c3-44c1-bd99-883f3c50da46';
  private CLIENT_PRIVATE_KEY = fs.readFileSync('/opt/pontte/arquivos/jwtECDSASHA512.key');


  generateHash=data=> {
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
