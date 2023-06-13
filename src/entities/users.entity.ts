import { getRounds, hashSync } from "bcryptjs";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Advert } from "./adverts.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ length: 120 })
  password: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "boolean", default: false })
  seller: boolean;

  @Column({ type: "varchar" })
  color: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToMany(() => Advert, (advert) => advert.user)
  adverts: Advert[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPasssword() {
    const isEncripted = getRounds(this.password);

    if (!isEncripted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
