import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FeeEntity } from "./Fee.entity";
import { IndividualEntity } from "./Individual.entity";
import { FinancialEntity } from "./Financial.entity";
import { InstallmentEntity } from "./Installment.entity";
import { BankAccountEntity } from "./BankAccount.entity";
import { AdditionalDebtEntity } from "./AdditionalDebt.entity";
import { IncomeCompositionEntity } from "./IncomeComposition.entity";
import { AttachmentEntity } from "./Attachment.entity";

@Index("attachments", ["attachments"], {})
@Index("borrower", ["borrower"], {})
@Index("debts", ["debts"], {})
@Index("disbursement_account", ["disbursementAccount"], {})
@Index("external_contract_fees", ["externalContractFees"], {})
@Index("financial", ["financial"], {})
@Index("income_composition", ["incomeComposition"], {})
@Index("installments", ["installments"], {})
@Index("related_parties", ["relatedParties"], {})
@Entity("debt", { schema: "pontte_escrow" })
export class DebtEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "external_contract_fees", nullable: true })
  externalContractFees: number | null;

  @Column("int", { name: "related_parties", nullable: true })
  relatedParties: number | null;

  @Column("int", { name: "borrower", nullable: true })
  borrower: number | null;

  @Column("varchar", { name: "real_estate", nullable: true, length: 255 })
  realEstate: string | null;

  @Column("int", { name: "financial", nullable: true })
  financial: number | null;

  @Column("varchar", {
    name: "purchaser_document_number",
    nullable: true,
    length: 255,
  })
  purchaserDocumentNumber: string | null;

  @Column("varchar", {
    name: "custodian_document_number",
    nullable: true,
    length: 255,
  })
  custodianDocumentNumber: string | null;

  @Column("int", { name: "installments", nullable: true })
  installments: number | null;

  @Column("int", { name: "disbursement_account", nullable: true })
  disbursementAccount: number | null;

  @Column("varchar", { name: "cci_serial_number", nullable: true, length: 255 })
  cciSerialNumber: string | null;

  @Column("int", { name: "real_estate_analisys_expenses", nullable: true })
  realEstateAnalisysExpenses: number | null;

  @Column("int", { name: "real_estate_registry_expenses", nullable: true })
  realEstateRegistryExpenses: number | null;

  @Column("int", { name: "real_estate_due_balance", nullable: true })
  realEstateDueBalance: number | null;

  @Column("int", { name: "net_debt_amount", nullable: true })
  netDebtAmount: number | null;

  @Column("int", { name: "client_available_balance", nullable: true })
  clientAvailableBalance: number | null;

  @Column("int", { name: "debts", nullable: true })
  debts: number | null;

  @Column("int", { name: "income_composition", nullable: true })
  incomeComposition: number | null;

  @Column("int", { name: "attachments", nullable: true })
  attachments: number | null;

  @ManyToOne(() => FeeEntity, (fee) => fee.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "external_contract_fees", referencedColumnName: "id" }])
  externalContractFees2: FeeEntity;

  @ManyToOne(() => IndividualEntity, (individual) => individual.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "related_parties", referencedColumnName: "id" }])
  relatedParties2: IndividualEntity;

  @ManyToOne(() => IndividualEntity, (individual) => individual.debts2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "borrower", referencedColumnName: "id" }])
  borrower2: IndividualEntity;

  @ManyToOne(() => FinancialEntity, (financial) => financial.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "financial", referencedColumnName: "id" }])
  financial2: FinancialEntity;

  @ManyToOne(() => InstallmentEntity, (installment) => installment.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "installments", referencedColumnName: "id" }])
  installments2: InstallmentEntity;

  @ManyToOne(() => BankAccountEntity, (bankAccount) => bankAccount.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "disbursement_account", referencedColumnName: "id" }])
  disbursementAccount2: BankAccountEntity;

  @ManyToOne(() => AdditionalDebtEntity, (additionalDebt) => additionalDebt.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "debts", referencedColumnName: "id" }])
  debts2: AdditionalDebtEntity;

  @ManyToOne(
    () => IncomeCompositionEntity,
    (incomeComposition) => incomeComposition.debts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "income_composition", referencedColumnName: "id" }])
  incomeComposition2: IncomeCompositionEntity;

  @ManyToOne(() => AttachmentEntity, (attachment) => attachment.debts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "attachments", referencedColumnName: "id" }])
  attachments2: AttachmentEntity;
}
