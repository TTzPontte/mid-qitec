import { DebtDto } from "./debt.dto";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BorrowerDto {
  id: number;
  cnaeCode: string | null;
  companyDocumentNumber: string | null;
  companyStatute: string | null;
  companyRepresentatives: string | null;
  companyType: string | null;
  email: string | null;
  foundationDate: string | null;
  fullName: string | null;
  personType: string | null;
  phone: string | null;
  tradingName: string | null;
  motherName: string | null;
  birthDate: Date | null;
  profession: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  isPep: string | null;
  propertySystem: string | null;
  individualDocumentNumber: string | null;
  documentIdentificationNumber: string | null;
  spouse: string | null;
  weddingCertificate: string | null;
  documentIdentification: string | null;
  proofOfResidence: string | null;
  // debt: DebtDto;
  @IsNotEmpty()
  addressCity: string | null;
  @IsNotEmpty()
  addressComplement: string | null;
  @IsNotEmpty()
  addressNeighborhood: string | null;
  @IsNotEmpty()
  addressNumber: string | null;
  @IsNotEmpty()
  addressPostalCode: string | null;
  @IsNotEmpty()
  addressState: string | null;
  @IsNotEmpty()
  addressStreet: string | null;
  @IsNotEmpty()
  addressCountry: string | null;

  documentIdentificationAttachBase64: string | null;
  proofOfResidenceAttachBase64: string | null;
  companyStatuteAttachBase64: string | null;

  proofOfResidenceAttachTypeFile: string;
  documentIdentificationAttachTypeFile: string;
}
