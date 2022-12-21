import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671651051501 implements MigrationInterface {
    name = 'default1671651051501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "preco" TYPE numeric(18,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "preco" TYPE numeric(5,2)`);
    }

}
