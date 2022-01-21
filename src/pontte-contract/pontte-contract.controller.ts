import { Body, Controller, Get, Post } from '@nestjs/common';
import { DebtsService } from 'src/debts/debts.service';
import { DebtDto } from 'src/debts/dto/debt.dto';
import { EscrowDto } from 'src/escrow/dto/escrow.dto';
import { EscrowService } from 'src/escrow/escrow.service';
import { PontteContractService } from './pontte-contract.service';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

@Controller('pontte-contract')
export class PontteContractController {

  constructor(private readonly escrowService: EscrowService,
    private readonly pontteContractService: PontteContractService,
    private readonly debtsService: DebtsService) { }

  @Post('/debt')
  createDebt(@Body() debtDto: DebtDto) {
    return this.debtsService.create(debtDto);
    // return this.pontteContractService.teste();


  }

  @Post('/escrow')
  createEscrow(@Body() escrowDto: EscrowDto) {
    return this.escrowService.create(escrowDto);
  }

  @Post()
  save(@Body() payload :DebtDto) {
    this.pontteContractService.saveEscrowAndDebt(payload);
  }

  @Get()
  callQiTech() {
    this.pontteContractService.initializeContract();
  }

}
