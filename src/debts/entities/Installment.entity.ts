import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("installment", { schema: "pontte_escrow" })
export class InstallmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "principal_amortization_amount" })
  principalAmortizationAmount: string | null;

  @Column({ name: "due_date" })
  dueDate: string | null;

  @Column({ name: "prefixed_interest_amount" })
  prefixedInterestAmount: string | null;

  @Column({ name: "cost_tsa" })
  costTsa: string | null;

  @Column({ name: "cost_mip" })
  costMip: string | null;

  @Column({ name: "cost_dfi" })
  costDfi: string | null;

  @ManyToOne(() => DebtEntity, (debt) => debt.installments)
  debt: DebtEntity;
}
