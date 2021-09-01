import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RealEstateEntity } from "src/debts/entities/RealEstate.entity";

@Entity("re_possession_composition", { schema: "pontte_escrow" })
export class RePossessionCompositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string | null;

  @Column()
  percentage: string | null;

  @ManyToOne(
    () => RealEstateEntity,
    (realEstate) => realEstate.possessionComposition
  )
  @JoinColumn({ name: "possession_composition" })
  realEstate: RealEstateEntity;
}
