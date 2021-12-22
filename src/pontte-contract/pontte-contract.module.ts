import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { Escrow } from '../escrow/entities/escrow.entity';
import { EscrowService } from '../escrow/escrow.service';
import { GoogleDriveService } from '../google-drive/google-drive.service';
import { QitechService } from '../qitech/qitech.service';
import { PontteContract } from './entites/pontte-contract.entity';
import { PontteContractController } from './pontte-contract.controller';
import { PontteContractService } from './pontte-contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([Escrow, EscrowAccountDestination, EscrowAudit, EscrowAccountManager, EscrowAccountOwner, EscrowAccountManagerRepresentative, EscrowSigner, DebtEntity,
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
  controllers: [PontteContractController],
  providers: [QitechService, EscrowService, PontteContractService, GoogleDriveService, ConfigService, DebtsService]
})
export class PontteContractModule {

}
