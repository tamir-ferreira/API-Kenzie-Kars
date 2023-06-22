import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687441611976 implements MigrationInterface {
    name = 'InitialMigration1687441611976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zipCode" character varying(8) NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, "street" character varying NOT NULL, "number" integer, "complement" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(60) NOT NULL, "phone" character varying NOT NULL, "cpf" character varying(14) NOT NULL, "birthdate" date NOT NULL, "description" character varying, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "seller" boolean NOT NULL DEFAULT false, "color" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "reset_token" character varying, "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adverts" ("id" SERIAL NOT NULL, "brand" character varying(40) NOT NULL, "model" character varying(40) NOT NULL, "year" integer NOT NULL, "fuel" character varying(10) NOT NULL, "mileage" integer NOT NULL, "color" character varying(20) NOT NULL, "fipe_price" numeric(12,2) NOT NULL DEFAULT '0', "price" numeric(12,2) NOT NULL DEFAULT '0', "description" text NOT NULL, "cover_image" text NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT 'true', "userId" integer, CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`DROP TABLE "adverts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
