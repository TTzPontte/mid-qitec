import { EscrowAccountManagerDto } from "src/escrow/dto/escrow-account-manager.dto";

export class EscrowAccountManagerRepresentativeDto {

    id: number;
    escrowAccountManager: EscrowAccountManagerDto;
    personType: string;
    name: string;
    motherName: string;
    birthDate: Date;
    nationality: string;
    isPep: number;
    individualDocumentNumber: string;
    
    email: string;
    phoneCountryCode: string;
    phoneAreaCode: string;
    phoneNumber: string;
    addressStreet: string;
    addressState: string;
    addressCity: string;
    addressNeighborhood: string;
    addressNumber: string;
    addressPostalCode: string;
    addressComplement: string;

    proofOfResidence: string;
    documentIdentification: string;
}
