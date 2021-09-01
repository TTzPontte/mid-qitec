import { DebtDto } from "./debt.dto";

export class DisbursementAccountDto {
  id: number;
  accountBranch: string | null;
  accountDigit: string | null;
  accountNumber: string | null;
  documentNumber: string | null;
  name: string | null;
  financialInstitutionsCodeNumber: string | null;
  // percentageReceivable: number | null;
  debt: DebtDto;
}
