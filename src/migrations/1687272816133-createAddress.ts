import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddress1687272816133 implements MigrationInterface {
    name = 'CreateAddress1687272816133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

}
