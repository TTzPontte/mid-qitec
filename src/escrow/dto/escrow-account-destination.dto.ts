import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAccountDestinationDto {

    id: number;
    escrow: EscrowDto;
    account_branch: string;
    account_digit: string;
    account_number: string;
    document_number: string;
    financial_institutions_code_number: string;
    name: string;
    ted_account_type: string;
}
