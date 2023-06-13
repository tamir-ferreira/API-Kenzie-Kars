import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1686661942963 implements MigrationInterface {
    name = 'UsersTable1686661942963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_color" TO "color"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "color" TO "user_color"`);
    }

}
