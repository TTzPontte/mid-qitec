import { EscrowAccountManagerDto } from "src/escrow/dto/escrow-account-manager.dto";

export class EscrowAccountManagerRepresentativeDto {
  id: number;
  escrowAccountManager: EscrowAccountManagerDto;
  person_type: string;
  name: string;
  mother_name: string;
  birth_date: Date;
  nationality: string;
  is_pep: number;
  individual_document_number: string;
  document_identification_attach: string;
  email: string;
  phone_country_code: string;
  phone_area_code: string;
  phone_number: string;
  address_street: string;
  address_state: string;
  address_city: string;
  address_neighborhood: string;
  address_number: string;
  address_postal_code: string;
  address_complement: string;
  proof_of_residence_attach: string;
}
