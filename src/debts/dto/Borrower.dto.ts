import { DebtDto } from "./debt.dto";

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
  birthDate: string | null;
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
  addressCity: string | null;
  addressComplement: string | null;
  addressNeighborhood: string | null;
  addressNumber: string | null;
  addressPostal_code: string | null;
  addressState: string | null;
  addressStreet: string | null;
  addressCountry: string | null;
}