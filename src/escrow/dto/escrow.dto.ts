import { EscrowAccountDestinationDto } from "../../escrow/dto/escrow-account-destination.dto";
import { EscrowAccountManagerDto } from "../../escrow/dto/escrow-account-manager.dto";
import { EscrowAccountOwnerDto } from "../../escrow/dto/escrow-account-owner.dto";
import { EscrowAuditDto } from "../../escrow/dto/escrow-audit.dto";
import { EscrowSignerDto } from "../../escrow/dto/escrow-signer.dto";

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
    destinationAccounts: EscrowAccountDestinationDto[];
    signerList: EscrowSignerDto[];
    auditList: EscrowAuditDto[];
    accountManager: EscrowAccountManagerDto;
    accountOwner: EscrowAccountOwnerDto;

}
