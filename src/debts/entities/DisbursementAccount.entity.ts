import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("disbursement_account", { schema: "pontte_escrow" })
export class DisbursementAccountEntity {
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

  @Column({ name: "percentage_receivable" })
  financialInstitutionsCodeNumber: string | null;

  @OneToOne(() => DebtEntity, (debt) => debt.disbursementAccount)
  @JoinColumn({ name: "debt_id" })
  debt: DebtEntity;
}
