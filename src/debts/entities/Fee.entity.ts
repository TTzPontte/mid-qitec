import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("fee", { schema: "pontte_escrow" })
export class FeeEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "fee_type", nullable: true, length: 255 })
  feeType: string | null;

  @Column("varchar", { name: "amount", nullable: true, length: 255 })
  amount: string | null;

  @Column("varchar", { name: "amount_type", nullable: true, length: 255 })
  amountType: string | null;

  @OneToMany(() => DebtEntity, (debt) => debt.externalContractFees2)
  debts: DebtEntity[];
}
