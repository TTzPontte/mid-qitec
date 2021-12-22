import { EscrowDto } from "../../escrow/dto/escrow.dto";

export class EscrowAuditDto {

    id: number;
    escrow: EscrowDto;
    responseEventTime :Date;
    responseKey: number;
    responseStatus: number;
    webhookType : number;
}
