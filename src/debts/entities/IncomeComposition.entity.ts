import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("income_composition", { schema: "pontte_escrow" })
export class IncomeCompositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string | null;

  @Column()
  percentage: number;

  // real old dont discoment at first sight huahau @JoinColumn({ name: "debt_id" })
  @ManyToOne(() => DebtEntity, (debt) => debt.incomeComposition)
  debt: DebtEntity;
}
