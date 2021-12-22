import { Escrow } from '../../escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class EscrowAccountOwner {

    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => Escrow, (escrow: Escrow) => escrow.accountOwner, {
    })
    escrow: Escrow;
    @Column({ type: 'varchar', length: 2, name: 'type' })
    type: string;
    @Column({ type: 'varchar', length: 100, name: 'name' })
    name: string;
    @Column({ type: 'varchar', length: 10, name: 'cnae_code' })
    cnaeCode: string;
    @Column({ type: 'varchar', length: 14, name: 'company_document_number' })
    companyDocumentNumber: string;
    @Column({ type: 'varchar', length: 45, name: 'company_statute_attach', nullable: true })
    companyStatuteAttach: string;
    @Column({ type: 'varchar', length: 255, name: 'email' })
    email: string;
    @Column({ type: 'date', name: 'foundation_date' })
    foundationDate: Date;
    @Column({ type: 'varchar', length: 20, name: 'person_type' })
    personType: string;
    @Column({ type: 'varchar', length: 100, name: 'address_street' })
    addressStreet: string;
    @Column({ type: 'varchar', length: 2, name: 'address_state' })
    addressState: string;
    @Column({ type: 'varchar', length: 100, name: 'address_city' })
    addressCity: string;
    @Column({ type: 'varchar', length: 100, name: 'address_neighborhood' })
    addressNeighborhood: string;
    @Column({ type: 'varchar', length: 10, name: 'address_number' })
    addressNumber: string;
    @Column({ type: 'varchar', length: 8, name: 'address_postal_code' })
    addressPostalCode: string;
    @Column({ type: 'varchar', length: 100, name: 'address_complement' })
    addressComplement: string;
    @Column({ type: 'varchar', length: 3, name: 'phone_country_code' })
    phoneCountryCode: string;
    @Column({ type: 'varchar', length: 11, name: 'phone_area_code' })
    phoneAreaCode: string;
    @Column({ type: 'varchar', length: 10, name: 'phone_number' })
    phoneNumber: string;
    @Column({ type: 'varchar', length: 100, name: 'mother_name' })
    motherName: string;
    @Column({ type: 'date', name: 'birth_date' })
    birthDate: Date;
    @Column({ type: 'varchar', length: 50, name: 'nationality' })
    nationality: string;
    @Column({ name: 'is_pep' })
    isPep: boolean;
    @Column({ type: 'varchar', length: 11, name: 'individual_document_number' })
    individualDocumentNumber: string;
    @Column({ type: 'varchar', length: 45, name: 'document_identification_attach', nullable: true })
    documentIdentificationAttach: string;
    @Column({ type: 'varchar', length: 45, name: 'proof_of_residence_attach', nullable: true })
    proofOfResidenceAttach: string;
}
