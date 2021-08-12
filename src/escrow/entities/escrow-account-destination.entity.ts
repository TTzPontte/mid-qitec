import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowAccountDestination {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.escrowAccountDestinationList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column()
    account_branch: string;
    @Column()
    account_digit: string;
    @Column()
    account_number: string;
    @Column()
    document_number: string;
    @Column()
    financial_institutions_code_number: string;
    @Column()
    name: string;
    @Column()
    ted_account_type: string;


}
