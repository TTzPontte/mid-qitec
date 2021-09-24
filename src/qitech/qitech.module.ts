import { Module } from '@nestjs/common';
import { QitechService } from './qitech.service';
import { QitechController } from './qitech.controller';
import { EscrowService } from 'src/escrow/escrow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { PontteContractService } from 'src/pontte-contract/pontte-contract.service';
import { ConfigService } from '@nestjs/config';
import { DebtsService } from 'src/debts/debts.service';
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
import { PontteContract } from 'src/pontte-contract/entites/pontte-contract.entity';

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
    IncomeCompositionEntity,PontteContract])],
  controllers: [QitechController],
  providers: [QitechService, EscrowService, GoogleDriveService, PontteContractService, ConfigService, DebtsService]
})
export class QitechModule {}
