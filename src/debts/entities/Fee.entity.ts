import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("fee", { schema: "pontte_escrow" })
export class FeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fee_type" })
  feeType: string | null;

  @Column({ name: "amount_type" })
  amountType: string | null;

  @Column()
  amount: string | null;

  @ManyToOne(() => DebtEntity, (debt) => debt.externalContractFees)
  debt: DebtEntity;
}
