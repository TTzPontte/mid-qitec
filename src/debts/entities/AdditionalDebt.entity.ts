import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("additional_debt", { schema: "pontte_escrow" })
export class AdditionalDebtEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number | null;

  @Column()
  description: string | null;

  @ManyToOne(() => DebtEntity, (debt) => debt.additionalDebts)
  debt: DebtEntity;
}
