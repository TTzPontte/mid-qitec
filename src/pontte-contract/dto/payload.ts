import { DebtDto } from "src/debts/dto/debt.dto";
import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class PonttePayload {
    debt: DebtDto;
    escrow: EscrowDto;
}