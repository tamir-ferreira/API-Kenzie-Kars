import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687208013124 implements MigrationInterface {
    name = 'InitialMigration1687208013124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" date NOT NULL`);
    }

}
