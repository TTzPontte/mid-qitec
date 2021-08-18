import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebtEntity } from "./debt.entity";

@Entity("attachment", { schema: "pontte_escrow" })
export class AttachmentEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "img", nullable: true, length: 255 })
  img: string | null;

  @OneToMany(() => DebtEntity, (debt) => debt.attachments2)
  debts: DebtEntity[];
}
