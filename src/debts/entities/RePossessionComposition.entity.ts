import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstateEntity } from "./RealEstate.entity";

@Entity("re_possession_composition", { schema: "pontte_escrow" })
export class RePossessionCompositionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "percentage", nullable: true, length: 255 })
  percentage: string | null;

  @OneToMany(
    () => RealEstateEntity,
    (realEstate) => realEstate.possessionComposition2
  )
  realEstates: RealEstateEntity[];
}
