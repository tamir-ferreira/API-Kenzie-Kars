import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text", nullable: true })
  image_link_one: string | undefined | null;

  @Column({ type: "text", nullable: true })
  image_link_two: string | undefined | null;

  @Column({ type: "text", nullable: true })
  image_link_three: string | undefined | null;

  @Column({ type: "text", nullable: true })
  image_link_four: string | undefined | null;

  @Column({ type: "text", nullable: true })
  image_link_five: string | undefined | null;

  @Column({ type: "text", nullable: true })
  image_link_six: string | undefined | null;
}

export { Image };
