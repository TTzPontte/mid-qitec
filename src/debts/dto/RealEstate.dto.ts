import { DebtDto } from "./debt.dto";
import { RePossessionCompositionDto } from "./RePossessionComposition.dto";

export class RealEstateDto {
  id: number;
  addressCity: string | null;
  addressComplement: string | null;
  addressNeighborhood: string | null;
  addressNumber: string | null;
  addressPostal_code: string | null;
  addressState: string | null;
  addressStreet: string | null;
  addressCountry: string | null;
  enrollmentNumber: string | null;
  municipalInscription: string | null;
  insurancePolicyNumber: string | null;
  warrantyType: string | null;
  notaryOfficeCode: number | null;
  description: string | null;
  incraCode?: string | null;
  estimatedValue: number | null;
  possessionComposition?: RePossessionCompositionDto[];
  debt: DebtDto;
}
