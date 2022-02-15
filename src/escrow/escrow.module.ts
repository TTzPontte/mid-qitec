import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsService } from 'src/debts/debts.service';
import { DebtValidator } from 'src/debts/debts.validator';
import { AdditionalDebtEntity } from 'src/debts/entities/AdditionalDebt.entity';
import { AttachmentEntity } from 'src/debts/entities/Attachment.entity';
import { BorrowerEntity } from 'src/debts/entities/Borrower.entity';
import { DebtEntity } from 'src/debts/entities/Debt.entity';
import { DestinationAccountEntity } from 'src/debts/entities/DestinationAccount.entity';
import { DisbursementAccountEntity } from 'src/debts/entities/DisbursementAccount.entity';
import { FeeEntity } from 'src/debts/entities/Fee.entity';
import { FinancialEntity } from 'src/debts/entities/Financial.entity';
import { IncomeCompositionEntity } from 'src/debts/entities/IncomeComposition.entity';
import { InstallmentEntity } from 'src/debts/entities/Installment.entity';
import { RealEstateEntity } from 'src/debts/entities/RealEstate.entity';
import { RelatedPartiesEntity } from 'src/debts/entities/RelatedParties.entity';
import { RePossessionCompositionEntity } from 'src/debts/entities/RePossessionComposition.entity';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { PontteContract } from 'src/pontte-contract/entites/pontte-contract.entity';
import { PontteContractController } from 'src/pontte-contract/pontte-contract.controller';
import { PontteContractService } from 'src/pontte-contract/pontte-contract.service';
import { PontteContractValidator } from 'src/pontte-contract/pontte-contract.validator';
import { QitechService } from 'src/qitech/qitech.service';
import { Escrow } from './entities/escrow.entity';
import { EscrowController } from './escrow.controller';
import { EscrowService } from './escrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Escrow, 
    EscrowAccountDestination, 
    EscrowAudit,
    EscrowAccountManager, 
    EscrowAccountOwner, 
    EscrowAccountManagerRepresentative, 
    EscrowSigner,
    DebtEntity,
    DestinationAccountEntity,
    AdditionalDebtEntity,
    AttachmentEntity,
    BorrowerEntity,
    DisbursementAccountEntity,
    FeeEntity,
    FinancialEntity,
    InstallmentEntity,
    RePossessionCompositionEntity,
    RealEstateEntity,
    RelatedPartiesEntity,
    IncomeCompositionEntity,
    PontteContract])],
  controllers: [EscrowController, PontteContractController],
  providers: [QitechService, EscrowService, PontteContractService, GoogleDriveService, DebtsService, PontteContractValidator, DebtValidator]
})
export class EscrowModule { }
