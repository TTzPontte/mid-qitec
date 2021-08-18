import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IndividualEntity } from "./Individual.entity";
import { RealEstateEntity } from "./RealEstate.entity";

@Entity("address", { schema: "pontte_escrow" })
export class AddressEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "street", nullable: true, length: 255 })
  street: string | null;

  @Column("varchar", { name: "state", nullable: true, length: 255 })
  state: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("varchar", { name: "neighborhood", nullable: true, length: 255 })
  neighborhood: string | null;

  @Column("varchar", { name: "number", nullable: true, length: 255 })
  number: string | null;

  @Column("varchar", { name: "postal_code", nullable: true, length: 255 })
  postalCode: string | null;

  @Column("varchar", { name: "complement", nullable: true, length: 255 })
  complement: string | null;

  @OneToMany(() => IndividualEntity, (individual) => individual.address2)
  individuals: IndividualEntity[];

  @OneToMany(() => RealEstateEntity, (realEstate) => realEstate.address2)
  realEstates: RealEstateEntity[];
}
