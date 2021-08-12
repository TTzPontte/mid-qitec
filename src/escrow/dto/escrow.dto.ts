import { EscrowAccountDestinationDto } from "src/escrow/dto/escrow-account-destination.dto";
import { EscrowAccountManagerDto } from "src/escrow/dto/escrow-account-manager.dto";
import { EscrowAccountOwnerDto } from "src/escrow/dto/escrow-account-owner.dto";
import { EscrowAuditDto } from "src/escrow/dto/escrow-audit.dto";
import { EscrowSignerDto } from "src/escrow/dto/escrow-signer.dto";

export class EscrowDto {

    id: number;
    pontte_contract_id: number;
    account_branch: string;
    account_number: string;
    financial_institution_code: string;
    status: number;
    status_name: string;
    status_reason: string;
    create_date: Date;
    update_date: Date;
    escrowAccountDestinations: EscrowAccountDestinationDto[];
    escrowSignerList: EscrowSignerDto[];
    escrowAuditList: EscrowAuditDto[];
    escrowAccountManagerList: EscrowAccountManagerDto[];
    escrowAccountOwnerList: EscrowAccountOwnerDto[];

}
