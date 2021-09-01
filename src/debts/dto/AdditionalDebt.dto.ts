import { DebtDto } from "./debt.dto";

export class AdditionalDebtDto {
  id: number;
  amount: number | null;
  description: string | null;
  debt: DebtDto;
}
