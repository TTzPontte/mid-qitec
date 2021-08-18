import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AddressEntity } from "./Address.entity";
import { RePossessionCompositionEntity } from "./RePossessionComposition.entity";

@Index("address", ["address"], {})
@Index("possession_composition", ["possessionComposition"], {})
@Entity("real_Estate", { schema: "pontte_escrow" })
export class RealEstateEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "address", nullable: true })
  address: number | null;

  @Column("varchar", { name: "enrollment_number", nullable: true, length: 255 })
  enrollmentNumber: string | null;

  @Column("varchar", {
    name: "municipal_inscription",
    nullable: true,
    length: 255,
  })
  municipalInscription: string | null;

  @Column("varchar", {
    name: "insurance_policy_number",
    nullable: true,
    length: 255,
  })
  insurancePolicyNumber: string | null;

  @Column("varchar", { name: "warranty_type", nullable: true, length: 255 })
  warrantyType: string | null;

  @Column("int", { name: "notary_office_code", nullable: true })
  notaryOfficeCode: number | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "incra_code", nullable: true, length: 255 })
  incraCode: string | null;

  @Column("int", { name: "estimated_value", nullable: true })
  estimatedValue: number | null;

  @Column("int", { name: "possession_composition", nullable: true })
  possessionComposition: number | null;

  @ManyToOne(() => AddressEntity, (address) => address.realEstates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address", referencedColumnName: "id" }])
  address2: AddressEntity;

  @ManyToOne(
    () => RePossessionCompositionEntity,
    (rePossessionComposition) => rePossessionComposition.realEstates,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "possession_composition", referencedColumnName: "id" }])
  possessionComposition2: RePossessionCompositionEntity;
}
