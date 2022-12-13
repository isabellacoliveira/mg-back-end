import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670959205294 implements MigrationInterface {
    name = 'default1670959205294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."usuarios_role_enum" AS ENUM('admin', 'cliente')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "sobrenome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "role" "public"."usuarios_role_enum" NOT NULL DEFAULT 'cliente', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "preco" numeric(5,2) NOT NULL, "imagem" character varying NOT NULL, "usuario_id" integer, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, CONSTRAINT "UQ_5571e686546725143d209a9ac29" UNIQUE ("titulo"), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_produto" ("categoria_id" integer NOT NULL, "produto_id" integer NOT NULL, CONSTRAINT "PK_fa5f0042d4f247453b1e451a01f" PRIMARY KEY ("categoria_id", "produto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a9b2c33b102c1c50023cb9584" ON "categoria_produto" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0daed4fa6e314cd8447358a8b" ON "categoria_produto" ("produto_id") `);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_86ebd85db07a16ff5b0615fa953" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categoria_produto" ADD CONSTRAINT "FK_8a9b2c33b102c1c50023cb95840" FOREIGN KEY ("categoria_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categoria_produto" ADD CONSTRAINT "FK_b0daed4fa6e314cd8447358a8b7" FOREIGN KEY ("produto_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria_produto" DROP CONSTRAINT "FK_b0daed4fa6e314cd8447358a8b7"`);
        await queryRunner.query(`ALTER TABLE "categoria_produto" DROP CONSTRAINT "FK_8a9b2c33b102c1c50023cb95840"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_86ebd85db07a16ff5b0615fa953"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0daed4fa6e314cd8447358a8b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a9b2c33b102c1c50023cb9584"`);
        await queryRunner.query(`DROP TABLE "categoria_produto"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_role_enum"`);
    }

}
