import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowAccountManagerRepresentative {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => EscrowAccountManager, escrowAccountManager => escrowAccountManager.escrowAccountManagerRepresentativeList)
    @JoinColumn({ name: "escrow_account_manager_id" })
    escrowAccountManager: EscrowAccountManager;
    @Column({ type: 'varchar', length: 20 })
    person_type: string;
    @Column({ type: 'varchar', length: 100 })
    name: string;
    @Column({ type: 'varchar', length: 100 })
    mother_name: string;
    @Column()
    birth_date: Date;
    @Column({ type: 'varchar', length: 50 })
    nationality: string;
    @Column()
    is_pep: boolean;
    @Column({ type: 'varchar', length: 11 })
    individual_document_number: string;
    @Column({ type: 'varchar', length: 45 })
    document_identification_attach: string;
    @Column({ type: 'varchar', length: 255 })
    email: string;
    @Column({ type: 'varchar', length: 3 })
    phone_country_code: string;
    @Column({ type: 'varchar', length: 11 })
    phone_area_code: string;
    @Column({ type: 'varchar', length: 10 })
    phone_number: string;
    @Column({ type: 'varchar', length: 100 })
    address_street: string;
    @Column({ type: 'varchar', length: 2 })
    address_state: string;
    @Column({ type: 'varchar', length: 100 })
    address_city: string;
    @Column({ type: 'varchar', length: 100 })
    address_neighborhood: string;
    @Column({ type: 'varchar', length: 10 })
    address_number: string;
    @Column({ type: 'varchar', length: 8 })
    address_postal_code: string;
    @Column({ type: 'varchar', length: 100 })
    address_complement: string;
    @Column({ type: 'varchar', length: 45 })
    proof_of_residence_attach: string;

}
