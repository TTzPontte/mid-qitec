import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("bank_account", { schema: "pontte_escrow" })
export class BankAccountEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "bank_code", nullable: true, length: 255 })
  bankCode: string | null;

  @Column("varchar", { name: "branch_number", nullable: true, length: 255 })
  branchNumber: string | null;

  @Column("varchar", { name: "account_number", nullable: true, length: 255 })
  accountNumber: string | null;

  @Column("varchar", { name: "account_digit", nullable: true, length: 255 })
  accountDigit: string | null;

  @Column("varchar", { name: "document_number", nullable: true, length: 255 })
  documentNumber: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "percentage_receivable", nullable: true })
  percentageReceivable: number | null;

  @OneToMany(() => DebtEntity, (debt) => debt.disbursementAccount2)
  debts: DebtEntity[];
}
