import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdvertsTable1685713423360 implements MigrationInterface {
    name = 'CreateAdvertsTable1685713423360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adverts" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "description" text, "price" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "brand" character varying(40) NOT NULL, "model" character varying(40) NOT NULL, "year" integer NOT NULL, "fuel" character varying(10) NOT NULL, CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "adverts"`);
    }

}
