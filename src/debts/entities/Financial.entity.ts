import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("financial", { schema: "pontte_escrow" })
export class FinancialEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "amount", nullable: true })
  amount: number | null;

  @Column("varchar", {
    name: "credit_operation_type",
    nullable: true,
    length: 255,
  })
  creditOperationType: string | null;

  @Column("varchar", { name: "issue_date", nullable: true, length: 255 })
  issueDate: string | null;

  @Column("varchar", { name: "disbursement_date", nullable: true, length: 255 })
  disbursementDate: string | null;

  @Column("int", { name: "effective_prefixed_interest_rate", nullable: true })
  effectivePrefixedInterestRate: number | null;

  @Column("int", {
    name: "principal_amortization_month_period",
    nullable: true,
  })
  principalAmortizationMonthPeriod: number | null;

  @Column("int", { name: "interest_grace_period", nullable: true })
  interestGracePeriod: number | null;

  @Column("varchar", { name: "interest_type", nullable: true, length: 255 })
  interestType: string | null;

  @Column("varchar", { name: "financial_index", nullable: true, length: 255 })
  financialIndex: string | null;

  @Column("int", { name: "number_of_installments", nullable: true })
  numberOfInstallments: number | null;

  @Column("int", { name: "total_effective_cost", nullable: true })
  totalEffectiveCost: number | null;

  @Column("int", { name: "principal_grace_period", nullable: true })
  principalGracePeriod: number | null;

  @Column("int", { name: "fine_config_contract_fine_rate", nullable: true })
  fineConfigContractFineRate: number | null;

  @Column("varchar", {
    name: "fine_config_interest_base",
    nullable: true,
    length: 255,
  })
  fineConfigInterestBase: string | null;

  @Column("int", { name: "fine_confi_monthly_rate", nullable: true })
  fineConfiMonthlyRate: number | null;

  @Column("varchar", {
    name: "early_settlement_configuration_type",
    nullable: true,
    length: 255,
  })
  earlySettlementConfigurationType: string | null;

  @Column("int", {
    name: "early_settlement_configuration_fixed_interest_rate",
    nullable: true,
  })
  earlySettlementConfigurationFixedInterestRate: number | null;

  @Column("varchar", {
    name: "prefixed_interest_rate_interest_base",
    nullable: true,
    length: 255,
  })
  prefixedInterestRateInterestBase: string | null;

  @Column("int", { name: "prefixed_interest_rate_annual_rate", nullable: true })
  prefixedInterestRateAnnualRate: number | null;

  @OneToMany(() => DebtEntity, (debt) => debt.financial2)
  debts: DebtEntity[];
}
