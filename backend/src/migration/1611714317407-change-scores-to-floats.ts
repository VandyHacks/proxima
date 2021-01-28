import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeScoresToDecimals1611714317407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const notes = await queryRunner.query('SELECT * from notes;');
    await queryRunner.dropColumn('notes', 'reliability');
    await queryRunner.query('ALTER TABLE notes ADD reliability DECIMAL');
    const reliabilityPromises = notes.map(note => {
      return queryRunner.query(
        `UPDATE notes SET reliability=${parseInt(note.reliability)} WHERE id=${
          note.id
        }`
      );
    });
    await Promise.all(reliabilityPromises);

    await queryRunner.dropColumn('notes', 'interest');
    await queryRunner.query('ALTER TABLE notes ADD interest DECIMAL');
    const interestPromises = notes.map(note => {
      return queryRunner.query(
        `UPDATE notes SET interest=${parseInt(note.interest)} WHERE id=${
          note.id
        }`
      );
    });
    await Promise.all(interestPromises);

    await queryRunner.dropColumn('notes', 'teamwork');
    await queryRunner.query('ALTER TABLE notes ADD teamwork DECIMAL');
    const teamworkPromises = notes.map(note => {
      return queryRunner.query(
        `UPDATE notes SET teamwork=${parseInt(note.teamwork)} WHERE id=${
          note.id
        }`
      );
    });
    await Promise.all(teamworkPromises);

    await queryRunner.dropColumn('notes', 'overall');
    await queryRunner.query('ALTER TABLE notes ADD overall DECIMAL');
    const overallPromises = notes.map(note => {
      return queryRunner.query(
        `UPDATE notes SET overall=${parseInt(note.overall)} WHERE id=${note.id}`
      );
    });
    await Promise.all(overallPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
