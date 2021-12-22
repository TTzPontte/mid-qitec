import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsService } from '../debts/debts.service';
import { AdditionalDebtEntity } from '../debts/entities/AdditionalDebt.entity';
import { AttachmentEntity } from '../debts/entities/Attachment.entity';
import { BorrowerEntity } from '../debts/entities/Borrower.entity';
import { DebtEntity } from '../debts/entities/Debt.entity';
import { DestinationAccountEntity } from '../debts/entities/DestinationAccount.entity';
import { DisbursementAccountEntity } from '../debts/entities/DisbursementAccount.entity';
import { FeeEntity } from '../debts/entities/Fee.entity';
import { FinancialEntity } from '../debts/entities/Financial.entity';
import { IncomeCompositionEntity } from '../debts/entities/IncomeComposition.entity';
import { InstallmentEntity } from '../debts/entities/Installment.entity';
import { RealEstateEntity } from '../debts/entities/RealEstate.entity';
import { RelatedPartiesEntity } from '../debts/entities/RelatedParties.entity';
import { RePossessionCompositionEntity } from '../debts/entities/RePossessionComposition.entity';
import { EscrowAccountDestination } from '../escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from '../escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from '../escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from '../escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from '../escrow/entities/escrow-audit.entity';
import { EscrowSigner } from '../escrow/entities/escrow-signer.entity';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { PontteContract } from '../pontte-contract/entites/pontte-contract.entity';
import { PontteContractService } from '../pontte-contract/pontte-contract.service';
import { QitechService } from '../qitech/qitech.service';
import { Escrow } from './entities/escrow.entity';
import { EscrowController } from './escrow.controller';
import { EscrowService } from './escrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Escrow, EscrowAccountDestination, EscrowAudit, EscrowAccountManager, EscrowAccountOwner, EscrowAccountManagerRepresentative, EscrowSigner,DebtEntity,
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
    IncomeCompositionEntity,PontteContract])],
  controllers: [EscrowController],
  providers: [QitechService, EscrowService, PontteContractService, GoogleDriveService,DebtsService]
})
export class EscrowModule { }
