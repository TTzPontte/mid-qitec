import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowSigner {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.escrowSignerList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column()
    name: string;
    @Column()
    document_number: string;
}
