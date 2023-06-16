import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1686898988139 implements MigrationInterface {
    name = 'Migrations1686898988139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "mileage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "color" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "fipe_price" numeric(12,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "cover_image" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "userAdvertId" integer`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_a0d2fb2d0aa7b7e2a7a7b5f5fbf" FOREIGN KEY ("userAdvertId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_a0d2fb2d0aa7b7e2a7a7b5f5fbf"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "userAdvertId"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "fipe_price"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "title" character varying(150) NOT NULL`);
    }

}
