import { Controller, Get } from '@nestjs/common';
import { PontteContractService } from './pontte-contract.service';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

@Controller('pontte-contract')
export class PontteContractController {
  constructor(private readonly pontteContractService: PontteContractService) { }

  @Get()
  async createAccout() {
    // await this.pontteContractService.getFilesByDocument('02108308000180');
    let data = await this.pontteContractService.downloadFileById('1bZzGgtxBJdZEWA_ZGJyFW27DL7tTADda');


    console.log(data['DATA']);


  }

}
