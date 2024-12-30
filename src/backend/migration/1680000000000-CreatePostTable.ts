import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1680000000000 implements MigrationInterface {
	name = 'CreatePostTable1680000000000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "post" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "content" TEXT NOT NULL
      )
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "post"`);
	}
}
