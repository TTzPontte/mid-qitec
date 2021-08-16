import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowAudit {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.escrowAuditList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column()
    response_event_time: Date;
    @Column({ type: 'varchar', length: 45 })
    response_key: string;
    @Column({ type: 'varchar', length: 100 })
    response_status: string;
    @Column({ type: 'varchar', length: 45 })
    webhook_type: string;
}
