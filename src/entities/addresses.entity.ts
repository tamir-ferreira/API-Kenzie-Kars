import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar" })
  street: string;

  @Column({ type: "integer", nullable: true })
  number: number | null | undefined;

  @Column({ type: "varchar", nullable: true })
  complement: string | null | undefined;
}

export { Address };
