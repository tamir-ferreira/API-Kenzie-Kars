import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./users.entity";

@Entity("adverts")
export class Advert {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null | undefined;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  price: string | number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @Column({ length: 40 })
  brand: string;

  @Column({ length: 40 })
  model: string;

  @Column({ type: "integer" })
  year: number;

  @Column({ length: 10 })
  fuel: string;

  @Column({ type: "boolean", default: "true" })
  is_active: boolean;

  @ManyToOne(() => User)
  user: User;
}
