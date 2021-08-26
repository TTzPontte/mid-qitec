import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAccountOwnerDto {

    id: number;
    escrow: EscrowDto;
    type: string;
    name: string;
    cnaeCode: string;
    companyDocumentNumber: string;
    companyStatuteAttach: string;
    email: string;
    foundationDate: Date;
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
    isPep: number;
    individualDocumentNumber: string;
    documentIdentificationAttach: string;
    proofOfResidenceAttach: string;
}
