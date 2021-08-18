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
    @Column({ type: 'date', name: 'response_event_time' })
    responseEventTime: Date;
    @Column({ type: 'varchar', length: 45, name: 'response_key' })
    responseKey: string;
    @Column({ type: 'varchar', length: 100, name: 'response_status' })
    responseStatus: string;
    @Column({ type: 'varchar', length: 45, name: 'webhook_type' })
    webhookType: string;
}
