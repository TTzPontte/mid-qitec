import { Body, Controller, Get, Post } from '@nestjs/common';
import { DebtsService } from 'src/debts/debts.service';
import { DebtValidator } from 'src/debts/debts.validator';
import { DebtDto } from 'src/debts/dto/debt.dto';
import { EscrowAccountManagerDto } from 'src/escrow/dto/escrow-account-manager.dto';
import { EscrowService } from 'src/escrow/escrow.service';
import { QitechService } from 'src/qitech/qitech.service';
import { PontteContractService } from './pontte-contract.service';
import { PontteContractValidator } from './pontte-contract.validator';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

@Controller('pontte-contract')
export class PontteContractController {

  constructor(private readonly escrowService: EscrowService,
    private readonly pontteContractService: PontteContractService,
    private readonly qiTechService: QitechService,
    private readonly debtsService: DebtsService,
    private readonly debtValidator: DebtValidator,
    private readonly pontteContractValidator: PontteContractValidator,
    
    ) { }

  @Post()
  async save(@Body() payload :DebtDto) {
    const errors = await this.debtValidator.validate(payload);
    if (errors.length > 0) return {status: 400, payload: errors};
    const newEntity = await this.pontteContractService.saveEscrowAndDebt(payload);;
    return { status: 201, payload: newEntity };
    
  }

  @Get()
  async callQiTech() {
    await this.pontteContractService.initializeContract();
  }



  @Post("account-manager")
  async accontManager(@Body() payload :EscrowAccountManagerDto) {
    const errors = await this.pontteContractValidator.validateManager(payload);
    if (errors.length > 0) return {status: 400, payload: errors};
    const newEntity = await this.pontteContractService.saveEscrowAccountManager(payload);;
    return { status: 201, payload: null };
    
  }

}
