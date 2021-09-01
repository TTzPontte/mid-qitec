import { DebtDto } from "./debt.dto";

export class DestinationAccountDto {
  id: number;
  accountBranch: string | null;
  accountNumber: string | null;
  accountDigit: string | null;
  documentNumber: string | null;
  name: string | null;
  financialInstitutionsCodeNumber: string | null;
  debt: DebtDto;
}
