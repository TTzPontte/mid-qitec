import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowSigner {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.signerList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column({ type: 'varchar', length: 255, name: 'name' })
    name: string;
    @Column({ type: 'varchar', length: 45, name: 'document_number' })
    documentNumber: string;
}
