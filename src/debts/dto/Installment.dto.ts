import { DebtDto } from "./debt.dto";

export class InstallmentDto {
  id: number;
  principalAmortizationAmount: string | null;
  dueDate: string | null;
  prefixedInterestAmount: string | null;
  costTsa: string | null;
  costMip: string | null;
  costDfi: string | null;
  // debt: DebtDto;
}
