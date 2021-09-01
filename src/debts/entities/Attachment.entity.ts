import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DebtEntity } from "./Debt.entity";

@Entity("attachment", { schema: "pontte_escrow" })
export class AttachmentEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "img", nullable: true, length: 255 })
  img: string | null;

  @ManyToOne(() => DebtEntity, (debt) => debt.attachments)
  debt: DebtEntity;
}
