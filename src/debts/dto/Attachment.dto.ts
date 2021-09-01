import { DebtDto } from "./debt.dto";

export class AttachmentDto {
  id: number;
  img: string | null;
  debts: DebtDto;
}
