import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class EscrowAccountManager {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Escrow, escrow => escrow.escrowAccountManagerList)
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;
    @Column()
    type: string;
    @Column()
    name: string;
    @Column()
    cnae_code: string;
    @Column()
    company_document_number: string;
    @Column()
    company_statute_attach: string;
    @Column()
    email: string;
    @Column()
    foundation_date: Date;
    @Column()
    person_type: string;
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
    phone_country_code: string;
    @Column()
    phone_area_code: string;
    @Column()
    phone_number: string;
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
    proof_of_residence_attach: string;

    @OneToMany(type => EscrowAccountManagerRepresentative, escrowAccountManagerRepresentative => escrowAccountManagerRepresentative.escrowAccountManager)
    escrowAccountManagerRepresentativeList: EscrowAccountManagerRepresentative[];
}
