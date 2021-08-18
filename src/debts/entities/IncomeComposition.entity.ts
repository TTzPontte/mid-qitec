import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("income_composition", { schema: "pontte_escrow" })
export class IncomeCompositionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "percentage", nullable: true })
  percentage: number | null;

  @OneToMany(() => DebtEntity, (debt) => debt.incomeComposition2)
  debts: DebtEntity[];
}
