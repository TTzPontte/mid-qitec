import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAuditDto {
  id: number;
  escrow: EscrowDto;
  response_event_time: Date;
  response_key: number;
  response_status: number;
  webhook_type: number;
}
