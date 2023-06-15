import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1686815423792 implements MigrationInterface {
    name = 'CreateTables1686815423792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

}
