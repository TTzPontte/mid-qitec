import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAccountDestinationDto {

    id: number;
    escrow: EscrowDto;
    accountBranch: string;
    accountDigit: string;
    accountNumber: string;
    documentNumber: string;
    financialInstitutionsCodeNumber: string;
    name: string;
    tedAccountType: string;
}
