import { DebtDto } from "../../debts/dto/debt.dto";
import { EscrowDto } from "../../escrow/dto/escrow.dto";

export class PontteContractDto {
    debt: DebtDto;
    escrow: EscrowDto;
}