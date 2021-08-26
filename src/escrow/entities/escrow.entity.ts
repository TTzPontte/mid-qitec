import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Escrow {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'pontte_contract_id', nullable: true })
    pontteContractId: number;

    @Column({ type: 'varchar', length: 45, name: 'account_branch', nullable: true })
    accountBranch: string;

    @Column({ type: 'varchar', length: 45, name: 'account_number', nullable: true })
    accountNumber: string;

    @Column({ type: 'varchar', length: 45, name: 'financial_institution_code', nullable: true })
    financialInstitutionCode: string;

    @Column({ name: 'status' })
    status: number;

    @Column({ type: 'varchar', length: 45, name: 'status_name', nullable: true })
    statusName: string;

    @Column({ type: 'varchar', length: 100, name: 'status_reason', nullable: true })
    statusReason: string;

    @Column({ type: 'date', name: 'create_date' })
    createDate: Date;

    @Column({ type: 'date', name: 'update_date', nullable: true })
    updateDate: Date;

    @OneToMany(type => EscrowAccountDestination, escrowAccountDestination => escrowAccountDestination.escrow)
    escrowAccountDestinationList: EscrowAccountDestination[];

    @OneToMany(type => EscrowSigner, escrowSigner => escrowSigner.escrow)
    escrowSignerList: EscrowSigner[];

    @OneToMany(type => EscrowAudit, escrowAudit => escrowAudit.escrow)
    escrowAuditList: EscrowAudit[];

    @OneToOne(() => EscrowAccountManager)
    @JoinColumn({ name: "escrow_Account_Manager_id" })
    escrowAccountManager: EscrowAccountManager;

    @OneToOne(() => EscrowAccountOwner)
    @JoinColumn({ name: "escrow_account_owner_id" })
    escrowAccountOwner: EscrowAccountOwner;

}
