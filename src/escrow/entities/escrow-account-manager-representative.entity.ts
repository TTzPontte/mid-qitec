import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EscrowAccountManagerRepresentative {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => EscrowAccountManager, escrowAccountManager => escrowAccountManager.escrowAccountManagerRepresentativeList)
    @JoinColumn({ name: "escrow_account_manager_id" })
    escrowAccountManager: EscrowAccountManager;
    @Column()
    person_type: string;
    @Column()
    name: string;
    @Column()
    mother_name: string;
    @Column()
    birth_date: Date;
    @Column()
    nationality: string;
    @Column()
    is_pep: number;
    @Column()
    individual_document_number: string;
    @Column()
    document_identification_attach: string;
    @Column()
    email: string;
    @Column()
    phone_country_code: string;
    @Column()
    phone_area_code: string;
    @Column()
    phone_number: string;
    @Column()
    address_street: string;
    @Column()
    address_state: string;
    @Column()
    address_city: string;
    @Column()
    address_neighborhood: string;
    @Column()
    address_number: string;
    @Column()
    address_postal_code: string;
    @Column()
    address_complement: string;
    @Column()
    proof_of_residence_attach: string;

}
