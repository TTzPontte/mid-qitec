import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("financial", { schema: "pontte_escrow" })
export class FinancialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number | null;

  @Column({ name: "credit_operation_type" })
  creditOperationType: string | null;

  @Column({ name: "issue_date" })
  issueDate: string | null;

  @Column({ name: "disbursement_date" })
  disbursementDate: string | null;

  @Column({ name: "effective_prefixed_interest_rate" })
  effectivePrefixedInterestRate: number | null;

  @Column({ name: "principal_amortization_month_period" })
  principalAmortizationMonthPeriod: number | null;

  @Column({ name: "interest_grace_period" })
  interestGracePeriod: number | null;

  @Column({ name: "interest_type" })
  interestType: string | null;

  @Column({ name: "financial_index" })
  financialIndex: string | null;

  @Column({ name: "number_of_installments" })
  numberOfInstallments: number | null;

  @Column({ name: "total_effective_cost" })
  totalEffectiveCost: number | null;

  @Column({ name: "principal_grace_period" })
  principalGracePeriod: number | null;

  @Column({ name: "fine_config_contract_fine_rate" })
  fineConfigContractFineRate: number | null;

  @Column({ name: "fine_config_interest_base" })
  fineConfigInterestBase: string | null;

  @Column({ name: "fine_confi_monthly_rate" })
  fineConfigMonthlyRate: number | null;

  @Column({ name: "early_settlement_configuration_type" })
  earlySettlementConfigurationType: string | null;

  @Column({ name: "early_settlement_configuration_fixed_interest_rate" })
  earlySettlementConfigurationFixedInterestRate: number | null;

  @Column({ name: "prefixed_interest_rate_interest_base" })
  prefixedInterestRateInterestBase: string | null;

  @Column({ name: "prefixed_interest_rate_annual_rate" })
  prefixedInterestRateAnnualRate: number | null;

  @OneToOne(() => DebtEntity, (debt) => debt.financial)
  @JoinColumn({ name: "debt_id" })
  debt: DebtEntity;
}
