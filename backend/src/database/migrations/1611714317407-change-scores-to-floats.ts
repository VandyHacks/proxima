import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeScoresToFloats1611714317407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE notes ALTER COLUMN reliability TYPE FLOAT;'
    );
    await queryRunner.query(
      'ALTER TABLE notes ALTER COLUMN interest TYPE FLOAT;'
    );
    await queryRunner.query(
      'ALTER TABLE notes ALTER COLUMN teamwork TYPE FLOAT;'
    );
    await queryRunner.query(
      'ALTER TABLE notes ALTER COLUMN overall TYPE FLOAT;'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
