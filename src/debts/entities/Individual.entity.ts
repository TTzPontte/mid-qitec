import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./debt.entity";
import { AddressEntity } from "./Address.entity";

@Index("address", ["address"], {})
@Entity("individual", { schema: "pontte_escrow" })
export class IndividualEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "address", nullable: true })
  address: number | null;

  @Column("varchar", { name: "cnae_code", nullable: true, length: 255 })
  cnaeCode: string | null;

  @Column("varchar", {
    name: "company_document_number",
    nullable: true,
    length: 255,
  })
  companyDocumentNumber: string | null;

  @Column("varchar", { name: "company_statute", nullable: true, length: 255 })
  companyStatute: string | null;

  @Column("varchar", {
    name: "company_representatives",
    nullable: true,
    length: 255,
  })
  companyRepresentatives: string | null;

  @Column("varchar", { name: "company_type", nullable: true, length: 255 })
  companyType: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "foundation_date", nullable: true, length: 255 })
  foundationDate: string | null;

  @Column("varchar", { name: "full_name", nullable: true, length: 255 })
  fullName: string | null;

  @Column("varchar", { name: "person_type", nullable: true, length: 255 })
  personType: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "trading_name", nullable: true, length: 255 })
  tradingName: string | null;

  @Column("varchar", { name: "mother_name", nullable: true, length: 255 })
  motherName: string | null;

  @Column("varchar", { name: "birth_date", nullable: true, length: 255 })
  birthDate: string | null;

  @Column("varchar", { name: "profession", nullable: true, length: 255 })
  profession: string | null;

  @Column("varchar", { name: "nationality", nullable: true, length: 255 })
  nationality: string | null;

  @Column("varchar", { name: "marital_status", nullable: true, length: 255 })
  maritalStatus: string | null;

  @Column("varchar", { name: "is_pep", nullable: true, length: 255 })
  isPep: string | null;

  @Column("varchar", { name: "property_system", nullable: true, length: 255 })
  propertySystem: string | null;

  @Column("varchar", {
    name: "individual_document_number",
    nullable: true,
    length: 255,
  })
  individualDocumentNumber: string | null;

  @Column("varchar", {
    name: "document_identification_number",
    nullable: true,
    length: 255,
  })
  documentIdentificationNumber: string | null;

  @Column("varchar", { name: "spouse", nullable: true, length: 255 })
  spouse: string | null;

  @Column("varchar", {
    name: "wedding_certificate",
    nullable: true,
    length: 255,
  })
  weddingCertificate: string | null;

  @Column("varchar", {
    name: "document_identification",
    nullable: true,
    length: 255,
  })
  documentIdentification: string | null;

  @Column("varchar", {
    name: "proof_of_residence",
    nullable: true,
    length: 255,
  })
  proofOfResidence: string | null;

  @OneToMany(() => DebtEntity, (debt) => debt.relatedParties2)
  debts: DebtEntity[];

  @OneToMany(() => DebtEntity, (debt) => debt.borrower2)
  debts2: DebtEntity[];

  @ManyToOne(() => AddressEntity, (address) => address.individuals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address", referencedColumnName: "id" }])
  address2: AddressEntity;
}
