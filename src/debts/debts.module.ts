import { Module } from "@nestjs/common";
import { DebtsService } from "./debts.service";
import { DebtsController } from "./debts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdditionalDebtEntity } from "./entities/AdditionalDebt.entity";
import { AttachmentEntity } from "./entities/Attachment.entity";
import { BorrowerEntity } from "./entities/Borrower.entity";
import { DebtEntity } from "./entities/Debt.entity";
import { DisbursementAccountEntity } from "./entities/DisbursementAccount.entity";
import { FeeEntity } from "./entities/Fee.entity";
import { FinancialEntity } from "./entities/Financial.entity";
import { InstallmentEntity } from "./entities/Installment.entity";
import { RePossessionCompositionEntity } from "./entities/RePossessionComposition.entity";
import { RealEstateEntity } from "./entities/RealEstate.entity";
import { RelatedPartiesEntity } from "./entities/RelatedParties.entity";
import { IncomeCompositionEntity } from "./entities/IncomeComposition.entity";
import { DestinationAccountEntity } from "./entities/DestinationAccount.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
    ]),
  ],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
