import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { User } from "./users.entity";

@Entity("adverts")
export class Advert {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 40 })
  brand: string;

  @Column({ type: "varchar", length: 40 })
  model: string;

  @Column({ type: "integer" })
  year: number;

  @Column({ type: "varchar", length: 10 })
  fuel: string;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 20 })
  color: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  fipe_price: string | number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  price: string | number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  cover_image: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @Column({ type: "boolean", default: "true" })
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.adverts, { onDelete: "CASCADE" })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  capitalizeBrandAndModel() {
    if (this.brand) {
      this.brand = this.capitalizeFirstLetter(this.brand);
    }
    if (this.model) {
      this.model = this.capitalizeFirstLetter(this.model);
    }
  }

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
