import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("destination_account", { schema: "pontte_escrow" })
export class DestinationAccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "branch_number" })
  accountBranch: string | null;

  @Column({ name: "account_number" })
  accountNumber: string | null;

  @Column({ name: "account_digit" })
  accountDigit: string | null;

  @Column({ name: "document_number" })
  documentNumber: string | null;

  @Column()
  name: string | null;

  @ManyToOne(() => DebtEntity, (debt) => debt.destinationAccounts)
  debt: DebtEntity;
}
