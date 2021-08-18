import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PontteContractService } from './pontte-contract.service';
import { CreatePontteContractDto } from './dto/create-pontte-contract.dto';
import { UpdatePontteContractDto } from './dto/update-pontte-contract.dto';

@Controller('pontte-contract')
export class PontteContractController {
  constructor(private readonly pontteContractService: PontteContractService) {}

  // @Get()
  // uploadDocument() {
  //   this.pontteContractService.uploadDocument();
  // }

  @Get()
  createAccout() {
    this.pontteContractService.createEscrowAccount();
  }

}
