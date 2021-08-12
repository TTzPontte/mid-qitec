import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QitechService } from './qitech.service';
import { QitechDto } from './dto/qitech.dto';
import * as fs from 'fs';
import { json } from 'express';

@Controller('qitech')
export class QitechController {
  constructor(private readonly qitechService: QitechService) { }

  @Post()
  create(@Body() qitechDto: QitechDto) {
    const encodedBody = this.qitechService.generateEncodedBody(qitechDto);
    console.log(encodedBody);

    const bodyJWT = {
      "sub": "3fb54232-00c3-44c1-bd99-883f3c50da46",
      "signature": this.qitechService.generateSignature("POST", "/test", "application/json", this.qitechService.generateHash(encodedBody))
    }
    console.log(bodyJWT);

    const signature_header = this.qitechService.generateEncodedBody(bodyJWT);

    const body = {
      "encoded_body": encodedBody
    }

    const header = {
      "API-CLIENT-KEY": "3fb54232-00c3-44c1-bd99-883f3c50da46",
      "Authorization": "QIT 3fb54232-00c3-44c1-bd99-883f3c50da46:" + signature_header
    }

    const request = {
      body: body,
      header: header,
      endpoint: "/test",
      isFormData: false
    }
    const res = this.qitechService.request(request);

    console.log(res);
  }

  @Get('/upload')
  upload() {
    this.qitechService.upload();
  }

}
