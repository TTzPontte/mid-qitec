import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("additional_debt", { schema: "pontte_escrow" })
export class AdditionalDebtEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "amount", nullable: true })
  amount: number | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @OneToMany(() => DebtEntity, (debt) => debt.debts2)
  debts: DebtEntity[];
}
