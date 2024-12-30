import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1680000000001 implements MigrationInterface {
	name = 'CreateCommentTable1680000000001';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "comment" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL,
        "postId" INTEGER,
        CONSTRAINT "FK_post" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE
      )
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "comment"`);
	}
}
