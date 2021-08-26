import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowSignerDto {

    id: number;
    escrow: EscrowDto;
    name: string;
    documentNumber: string;
}
