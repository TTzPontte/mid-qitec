import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Escrow {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'pontte_contract_id', type: 'int' })
    pontte_contract_id: number;

    @Column({ type: 'varchar', length: 45 })
    account_branch: string;

    @Column({ type: 'varchar', length: 45 })
    account_number: string;

    @Column({ type: 'varchar', length: 45 })
    financial_institution_code: string;

    @Column({ type: 'int' })
    status: number;

    @Column({ type: 'varchar', length: 45 })
    status_name: string;

    @Column({ type: 'varchar', length: 100 })
    status_reason: string;

    @Column()
    create_date: Date;

    @Column()
    update_date: Date;

    @OneToMany(type => EscrowAccountDestination, escrowAccountDestination => escrowAccountDestination.escrow)
    escrowAccountDestinationList: EscrowAccountDestination[];

    @OneToMany(type => EscrowSigner, escrowSigner => escrowSigner.escrow)
    escrowSignerList: EscrowSigner[];

    @OneToMany(type => EscrowAudit, escrowAudit => escrowAudit.escrow)
    escrowAuditList: EscrowAudit[];

    @OneToMany(type => EscrowAccountManager, escrowAccountManager => escrowAccountManager.escrow)
    escrowAccountManagerList: EscrowAccountManager[];

    @OneToMany(type => EscrowAccountOwner, escrowAccountOwner => escrowAccountOwner.escrow)
    escrowAccountOwnerList: EscrowAccountOwner[];

}
