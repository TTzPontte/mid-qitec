
import { DebtEntity } from 'src/debts/entities/Debt.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PontteContract {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 11, name: 'document_number' })
    documentNumber: string;

    @Column({ type: 'varchar', length: 100, name: 'name' })
    name: string;

    @Column({ type: 'double', name: 'amount' })
    amount: Double;

    @Column({ name: 'status' })
    status: number;

    @Column({ type: 'date', name: 'create_date' })
    createDate: Date;

    @Column({ type: 'date', name: 'update_date', nullable: true })
    updateDate: Date;

    @OneToOne(() => Escrow, (escrow: Escrow) => escrow.pontteContract, {
        cascade: true,
    })
    @JoinColumn({ name: "escrow_id" })
    escrow: Escrow;

    @OneToOne(() => DebtEntity, (debt: DebtEntity) => debt.pontteContract, {
        cascade: true,
    })
    @JoinColumn({ name: "debt_id" })
    debt: DebtEntity;

}
