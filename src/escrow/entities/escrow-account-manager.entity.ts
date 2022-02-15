import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class EscrowAccountManager {

    @PrimaryGeneratedColumn()
    id: number;
    // @OneToOne(() => Escrow, (escrow: Escrow) => escrow.accountManager, {
    // })
    // escrow: Escrow;

    @Column({ name: 'status' })
    status: number;
    // @Column({ type: 'varchar', name: 'type' })
    // type: string;
    @Column('varchar', { length: 100, name: 'name' })
    name: string;
    @Column({ type: 'varchar', length: 10, name: 'cnae_code' })
    cnaeCode: string;
    @Column({ type: 'varchar', length: 14, name: 'company_document_number' })
    companyDocumentNumber: string;
    @Column({ type: 'varchar', length: 255, name: 'email' })
    email: string;
    @Column({ type: 'varchar', name: 'foundation_date' })
    foundationDate: string;
    @Column('varchar', { length: 20, name: 'person_type' })
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
    @Column({ type: 'varchar', length: 2, name: 'phone_area_code' })
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
    @Column({ type: 'varchar', name: 'individual_document_number' })
    individualDocumentNumber: string;
    @Column({ type: 'varchar', length: 100, name: 'trading_name' })
    tradingName: string;

    @Column({ type: 'mediumblob', name: 'document_identification_attach', nullable: true })
    documentIdentificationAttach: Buffer;
    @Column({ type: 'mediumblob', name: 'company_statute_attach', nullable: true })
    companyStatuteAttach: Buffer;
    @Column({ type: 'mediumblob', name: 'directors_election_minute_attach', nullable: true })
    directorsElectionMinuteAttach: Buffer;
    @Column({ type: 'mediumblob', name: 'proof_of_residence_attach', nullable: true })
    proofOfResidenceAttach: Buffer;

    @Column({ type: 'varchar', name: 'document_identification_attach_number', nullable: true })
    documentIdentificationAttachNumber: string;
    @Column({ type: 'varchar', name: 'company_statute_attach_number', nullable: true })
    companyStatuteAttachNumber: string;
    @Column({ type: 'varchar', name: 'directors_election_minute_attach_number', nullable: true })
    directorsElectionMinuteAttachNumber: string;
    @Column({ type: 'varchar', name: 'proof_of_residence_attach_number', nullable: true })
    proofOfResidenceAttachNumber: string;
    
    @Column({ type: 'varchar', name: 'document_identification_attach_type_file', nullable: true })
    documentIdentificationAttachTypeFile: string;
    @Column({ type: 'varchar', name: 'company_statute_type_attach_file', nullable: true })
    companyStatuteAttachTypeFile: string;
    @Column({ type: 'varchar', name: 'directors_election_minute_attach_type_file', nullable: true })
    directorsElectionMinuteAttachTypeFile: string;
    @Column({ type: 'varchar', name: 'proof_of_residence_type_attach_file', nullable: true })
    proofOfResidenceAttachTypeFile: string;

    @OneToMany(type => EscrowAccountManagerRepresentative, escrowAccountManagerRepresentative => escrowAccountManagerRepresentative.accountManager, {
        cascade: true,
    })
    accountManagerRepresentativeList: EscrowAccountManagerRepresentative[];
}

