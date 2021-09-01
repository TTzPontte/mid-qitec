import { DebtDto } from "./debt.dto";

export class FeeDto {
  id: number;
  feeType: string | null;
  amountType: string | null;
  amount: string | null;
  debt: DebtDto;
}
