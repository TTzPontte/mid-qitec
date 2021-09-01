import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";
import { RePossessionCompositionEntity } from "./RePossessionComposition.entity";

@Entity("real_estate", { schema: "pontte_escrow" })
export class RealEstateEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ name: "enrollment_number" })
  enrollmentNumber: string | null;

  @Column({ name: "municipal_inscription" })
  municipalInscription: string | null;

  @Column({ name: "insurance_policy_number" })
  insurancePolicyNumber: string | null;

  @Column({ name: "warranty_type" })
  warrantyType: string | null;

  @Column({ name: "notary_office_code" })
  notaryOfficeCode: number | null;

  @Column()
  description: string | null;

  @Column({ name: "incra_code", nullable: true })
  incraCode: string | null;

  @Column({ name: "estimated_value" })
  estimatedValue: number | null;

  @OneToMany(
    () => RePossessionCompositionEntity,
    (possessionComposition) => possessionComposition.realEstate,
    { cascade: ["insert"] }
  )
  @JoinColumn({ name: "possession_composition" })
  possessionComposition: RePossessionCompositionEntity[];

  @ManyToOne(() => DebtEntity, (debt) => debt.realEstates)
  debt: DebtEntity;
}
