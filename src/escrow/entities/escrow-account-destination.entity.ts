import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowAccountDestination {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.escrowAccountDestinationList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column({ type: 'varchar', length: 45, name: 'account_branch' })
    accountBranch: string;
    @Column({ type: 'varchar', length: 45, name: 'account_digit' })
    accountDigit: string;
    @Column({ type: 'varchar', length: 45, name: 'account_number' })
    accountNumber: string;
    @Column({ type: 'varchar', length: 45, name: 'document_number' })
    documentNumber: string;
    @Column({ type: 'varchar', length: 45, name: 'financial_institutions_code_number' })
    financialInstitutionsCodeNumber: string;
    @Column({ type: 'varchar', length: 45, name: 'name' })
    name: string;
    @Column({ type: 'varchar', length: 45, name: 'ted_account_type' })
    tedAccountType: string;


}
