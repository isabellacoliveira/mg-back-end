import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671649627537 implements MigrationInterface {
    name = 'default1671649627537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carrinhos_produtos" ("id" SERIAL NOT NULL, "carrinho_id" integer NOT NULL, "produto_id" integer NOT NULL, "qtdProduto" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_361b693f7a02c4ef25eec9cca49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carrinhos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "compraFinalizada" boolean NOT NULL DEFAULT false, "usuario_id" integer, CONSTRAINT "PK_8ed80828de93327d4601c21c30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias_produtos" ("categoria_id" integer NOT NULL, "produto_id" integer NOT NULL, CONSTRAINT "PK_b8b41344eb117f0febafe3be5dc" PRIMARY KEY ("categoria_id", "produto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0898e284ec369293908c0cbe87" ON "categorias_produtos" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_32800f4afe8dcdb0cada323ece" ON "categorias_produtos" ("produto_id") `);
        await queryRunner.query(`ALTER TABLE "carrinhos_produtos" ADD CONSTRAINT "FK_e0e173569420f22fa7152a451be" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carrinhos_produtos" ADD CONSTRAINT "FK_cf03391910e411cc8b71c515170" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carrinhos" ADD CONSTRAINT "FK_9cf07b18e658cbd538ee3c5fe37" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias_produtos" ADD CONSTRAINT "FK_0898e284ec369293908c0cbe879" FOREIGN KEY ("categoria_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categorias_produtos" ADD CONSTRAINT "FK_32800f4afe8dcdb0cada323eceb" FOREIGN KEY ("produto_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias_produtos" DROP CONSTRAINT "FK_32800f4afe8dcdb0cada323eceb"`);
        await queryRunner.query(`ALTER TABLE "categorias_produtos" DROP CONSTRAINT "FK_0898e284ec369293908c0cbe879"`);
        await queryRunner.query(`ALTER TABLE "carrinhos" DROP CONSTRAINT "FK_9cf07b18e658cbd538ee3c5fe37"`);
        await queryRunner.query(`ALTER TABLE "carrinhos_produtos" DROP CONSTRAINT "FK_cf03391910e411cc8b71c515170"`);
        await queryRunner.query(`ALTER TABLE "carrinhos_produtos" DROP CONSTRAINT "FK_e0e173569420f22fa7152a451be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32800f4afe8dcdb0cada323ece"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0898e284ec369293908c0cbe87"`);
        await queryRunner.query(`DROP TABLE "categorias_produtos"`);
        await queryRunner.query(`DROP TABLE "carrinhos"`);
        await queryRunner.query(`DROP TABLE "carrinhos_produtos"`);
    }

}
