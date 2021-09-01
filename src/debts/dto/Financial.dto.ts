import { DebtDto } from "./debt.dto";

export class FinancialDto {
  id: number;
  amount: number | null;
  creditOperationType: string | null;
  issueDate: string | null;
  disbursementDate: string | null;
  effectivePrefixedInterestRate: number | null;
  principalAmortizationMonthPeriod: number | null;
  interestGracePeriod: number | null;
  interestType: string | null;
  financialIndex: string | null;
  numberOfInstallments: number | null;
  totalEffectiveCost: number | null;
  principalGracePeriod: number | null;
  fineConfigContractFineRate: number | null;
  fineConfigInterestBase: string | null;
  fineConfiMonthlyRate: number | null;
  earlySettlementConfigurationType: string | null;
  earlySettlementConfigurationFixedInterestRate: number | null;
  prefixedInterestRateInterestBase: string | null;
  prefixedInterestRateAnnualRate: number | null;
  // debt: DebtDto;
}
