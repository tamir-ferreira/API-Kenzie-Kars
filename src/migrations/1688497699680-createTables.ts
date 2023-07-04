import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1688497699680 implements MigrationInterface {
    name = 'CreateTables1688497699680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

}
