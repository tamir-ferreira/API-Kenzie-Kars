import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveFieldInAdvertsTable1686012735775 implements MigrationInterface {
    name = 'AddIsActiveFieldInAdvertsTable1686012735775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ADD "is_active" boolean NOT NULL DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "is_active"`);
    }

}
