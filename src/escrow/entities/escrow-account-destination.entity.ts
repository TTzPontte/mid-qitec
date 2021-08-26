import { Escrow } from "src/escrow/entities/escrow.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class EscrowAccountDestination {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Escrow, (escrow) => escrow.escrowAccountDestinationList)
  @JoinColumn({ name: "escrow_id" })
  escrow: Escrow;

  @Column({ type: "varchar", length: 45 })
  account_branch: string;

  @Column({ type: "varchar", length: 45 })
  account_digit: string;

  @Column({ type: "varchar", length: 45 })
  account_number: string;

  @Column({ type: "varchar", length: 45 })
  document_number: string;

  @Column({ type: "varchar", length: 45 })
  financial_institutions_code_number: string;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45 })
  ted_account_type: string;
}
