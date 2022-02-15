import { EscrowAccountManagerRepresentativeDto } from "src/escrow/dto/escrow-account-manager-representative.dto";
import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAccountManagerDto {


    id: number;
    escrow: EscrowDto;
    type: string;
    name: string;
    cnaeCode: string;
    companyDocumentNumber: string;
    
    email: string;
    foundationDate: string;
    personType: string;
    addressStreet: string;
    addressState: string;
    addressCity: string;
    addressNeighborhood: string;
    addressNumber: string;
    addressPostalCode: string;
    addressComplement: string;
    phoneCountryCode: string;
    phoneAreaCode: string;
    phoneNumber: string;
    motherName: string;
    birthDate: Date;
    nationality: string;
    tradingName: string;
    isPep: number;
    individualDocumentNumber: string;

    documentIdentification: string;
    directorsElectionMinute: string;
    proofOfResidence: string;
    companyStatute: string;


    
    accountManagerRepresentativeList: EscrowAccountManagerRepresentativeDto[];
}
