import { EscrowDto } from "src/escrow/dto/escrow.dto";

export class EscrowAccountOwnerDto {
  id: number;
  escrow: EscrowDto;
  type: string;
  name: string;
  cnae_code: string;
  company_document_number: string;
  company_statute_attach: string;
  email: string;
  foundation_date: Date;
  person_type: string;
  address_street: string;
  address_state: string;
  address_city: string;
  address_neighborhood: string;
  address_number: string;
  address_postal_code: string;
  address_complement: string;
  phone_country_code: string;
  phone_area_code: string;
  phone_number: string;
  mother_name: string;
  birth_date: Date;
  nationality: string;
  is_pep: number;
  individual_document_number: string;
  document_identification_attach: string;
  proof_of_residence_attach: string;
}
