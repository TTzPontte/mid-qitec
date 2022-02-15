import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Blob} from 'buffer';
import { DebtEntity } from "./Debt.entity";

// @Index("address", ["address"], {})
@Entity()
export class BorrowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "cnae_code" })
  cnaeCode: string | null;

  @Column({ name: "company_document_number" })
  companyDocumentNumber: string | null;

  @Column({ name: "company_statute" })
  companyStatute: string | null;

  @Column({ name: "company_representatives" })
  companyRepresentatives: string | null;

  @Column({ name: "company_type" })
  companyType: string | null;

  @Column({ name: "email" })
  email: string | null;

  @Column({ name: "foundation_date" })
  foundationDate: string | null;

  @Column({ name: "full_name" })
  fullName: string | null;

  @Column({ name: "person_type" })
  personType: string | null;

  @Column({ name: "phone" })
  phone: string | null;

  @Column({ name: "trading_name" })
  tradingName: string | null;

  @Column({ name: "mother_name" })
  motherName: string | null;

  @Column({ name: "birth_date" })
  birthDate: Date | null;

  @Column({ name: "profession" })
  profession: string | null;

  @Column({ name: "nationality" })
  nationality: string | null;

  @Column({ name: "marital_status" })
  maritalStatus: string | null;

  @Column({ name: "is_pep" })
  isPep: string | null;

  @Column({ name: "property_system" })
  propertySystem: string | null;

  @Column({ name: "individual_document_number" })
  individualDocumentNumber: string | null;

  @Column({ name: "document_identification_number" })
  documentIdentificationNumber: string | null;

  @Column({ name: "spouse" })
  spouse: string | null;

  @Column({ name: "wedding_certificate", type: "mediumblob", nullable: true, }, )
  weddingCertificate: Buffer | null;

  @Column({ name: "document_identification", type: "mediumblob", nullable: true })
  documentIdentification: Buffer | null;

  @Column({ name: 'proof_of_residence', type: "mediumblob", nullable: true })
  proofOfResidence: Buffer | null;


  @Column({ type: 'varchar', name: 'wedding_Certificate_Attach_Number', nullable: true })
  weddingCertificateAttachNumber: string;

  @Column({ type: 'varchar', name: 'document_Identification_Attach_Number', nullable: true })
  documentIdentificationAttachNumber: string;

  @Column({ type: 'varchar', name: 'proof_Of_Residence_Attach_Number', nullable: true })
  proofOfResidenceAttachNumber: string;

  @Column({ type: 'varchar', name: 'wedding_Certificate_Attach_Type_File', nullable: true })
  weddingCertificateAttachTypeFile: string;

  @Column({ type: 'varchar', name: 'document_IdentificationAttach_Type_File', nullable: true })
  documentIdentificationAttachTypeFile: string;

  @Column({ type: 'varchar', name: 'proof_Of_Residence_Attach_Type_File', nullable: true })
  proofOfResidenceAttachTypeFile: string;


  @Column({ name: "address_city" })
  addressCity: string | null;

  @Column({ name: "address_complement" })
  addressComplement: string | null;

  @Column({ name: "address_neighborhood" })
  addressNeighborhood: string | null;

  @Column({ name: "address_number" })
  addressNumber: string | null;

  @Column({ name: "address_postal_code" })
  addressPostalCode: string | null;

  @Column({ name: "address_state" })
  addressState: string | null;

  @Column({ name: "address_street" })
  addressStreet: string | null;

  @Column({ name: "address_country" })
  addressCountry: string | null;

  @OneToOne(() => DebtEntity, (debt) => debt.borrower)
  @JoinColumn({ name: "debt_id" })
  debt: DebtEntity;
}
