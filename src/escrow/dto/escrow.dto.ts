import { EscrowAccountDestinationDto } from "src/escrow/dto/escrow-account-destination.dto";
import { EscrowAccountManagerDto } from "src/escrow/dto/escrow-account-manager.dto";
import { EscrowAccountOwnerDto } from "src/escrow/dto/escrow-account-owner.dto";
import { EscrowAuditDto } from "src/escrow/dto/escrow-audit.dto";
import { EscrowSignerDto } from "src/escrow/dto/escrow-signer.dto";

export class EscrowDto {

    id: number;
    pontteContractId: number;
    accountBranch: string;
    accountNumber: string;
    financialInstitutionCode: string;
    status: number;
    statusName: string;
    statusReason: string;
    createDate: Date;
    updateDate: Date;
    escrowAccountDestinations: EscrowAccountDestinationDto[];
    escrowSignerList: EscrowSignerDto[];
    escrowAuditList: EscrowAuditDto[];
    escrowAccountManager: EscrowAccountManagerDto;
    escrowAccountOwner: EscrowAccountOwnerDto;

}
