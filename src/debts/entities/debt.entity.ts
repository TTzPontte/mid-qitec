import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FeeEntity } from "./Fee.entity";
import { AttachmentEntity } from "./Attachment.entity";
import { IncomeCompositionEntity } from "./IncomeComposition.entity";
import { DisbursementAccountEntity } from "./DisbursementAccount.entity";
import { AdditionalDebtEntity } from "./AdditionalDebt.entity";
import { RelatedPartiesEntity } from "./RelatedParties.entity";
import { BorrowerEntity } from "./Borrower.entity";
import { DestinationAccountEntity } from "./DestinationAccount.entity";
import { InstallmentEntity } from "./Installment.entity";
import { FinancialEntity } from "./Financial.entity";
import { RealEstateEntity } from "./RealEstate.entity";

@Entity("debt", { schema: "pontte_escrow" })
export class DebtEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "purchaser_document_number" })
  purchaserDocumentNumber: string | null;

  @Column({ name: "custodian_document_number" })
  custodianDocumentNumber: string | null;

  @Column({ name: "cci_serial_number" })
  cciSerialNumber: string | null;

  @Column({ name: "real_estate_analisys_expenses" })
  realEstateAnalisysExpenses: number | null;

  @Column({ name: "real_estate_registry_expenses" })
  realEstateRegistryExpenses: number | null;

  @Column({ name: "real_estate_due_balance" })
  realEstateDueBalance: number | null;

  @Column({ name: "net_debt_amount" })
  netDebtAmount: number | null;

  @Column({ name: "client_available_balance" })
  clientAvailableBalance: number | null;

  @OneToOne(() => BorrowerEntity, (borrower) => borrower.debt, {
    cascade: ["insert"],
  })
  borrower: BorrowerEntity;

  @OneToOne(() => FinancialEntity, (financial) => financial.debt, {
    cascade: ["insert"],
  })
  financial: FinancialEntity;

  @OneToOne(
    () => DisbursementAccountEntity,
    (disbursementAccount) => disbursementAccount.debt,
    { cascade: ["insert"] }
  )
  disbursementAccount: DisbursementAccountEntity;

  @OneToMany(
    () => FeeEntity,
    (externalContractFees) => externalContractFees.debt
  )
  @JoinColumn({ name: "external_contract_fees" })
  externalContractFees: FeeEntity[];

  @OneToMany(() => AttachmentEntity, (attachments) => attachments.debt)
  attachments: AttachmentEntity[];

  @OneToMany(
    () => RelatedPartiesEntity,
    (relatedParties) => relatedParties.debt
  )
  @JoinColumn({ name: "related_parties" })
  relatedParties: RelatedPartiesEntity[];

  @OneToMany(() => InstallmentEntity, (installments) => installments.debt)
  @JoinColumn()
  installments: InstallmentEntity[];

  @OneToMany(
    () => AdditionalDebtEntity,
    (additionalDebt) => additionalDebt.debt,
    {
      cascade: ["insert"],
    }
  )
  @JoinColumn({ name: "additional_debt" })
  additionalDebts: AdditionalDebtEntity[];

  @OneToMany(
    () => IncomeCompositionEntity,
    (incomeComposition) => incomeComposition.debt
  )
  @JoinColumn({ name: "income_composition" })
  incomeComposition: IncomeCompositionEntity[];

  @OneToMany(
    () => DestinationAccountEntity,
    (destinationAccount) => destinationAccount.debt
  )
  @JoinColumn({ name: "destination_accounts" })
  destinationAccounts: DestinationAccountEntity[];

  @OneToMany(() => RealEstateEntity, (realEstate) => realEstate.debt)
  realEstates: RealEstateEntity[];
}
