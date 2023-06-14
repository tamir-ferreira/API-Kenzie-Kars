import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar" })
  neighborhood: string;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "integer", nullable: true })
  number: number;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;
}

export { Address };
