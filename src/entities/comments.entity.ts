import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./users.entity";
import { Advert } from "./adverts.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "varchar" })
  content: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Advert, (advert) => advert.comments, { onDelete: "CASCADE" })
  advert: Advert;
}
