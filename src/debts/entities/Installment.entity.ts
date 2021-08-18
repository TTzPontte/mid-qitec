import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("installment", { schema: "pontte_escrow" })
export class InstallmentEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "principal_amortization_amount",
    nullable: true,
    length: 255,
  })
  principalAmortizationAmount: string | null;

  @Column("varchar", { name: "due_date", nullable: true, length: 255 })
  dueDate: string | null;

  @Column("varchar", {
    name: "prefixed_interest_amount",
    nullable: true,
    length: 255,
  })
  prefixedInterestAmount: string | null;

  @Column("varchar", { name: "cost_tsa", nullable: true, length: 255 })
  costTsa: string | null;

  @Column("varchar", { name: "cost_mip", nullable: true, length: 255 })
  costMip: string | null;

  @Column("varchar", { name: "cost_dfi", nullable: true, length: 255 })
  costDfi: string | null;

  @OneToMany(() => DebtEntity, (debt) => debt.installments2)
  debts: DebtEntity[];
}
