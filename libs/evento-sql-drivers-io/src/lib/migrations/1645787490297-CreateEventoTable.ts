import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventoTable1645787490297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS goings_on
      (
        id_goings_on VARCHAR
      (
        37
      ) NOT NULL,
        description VARCHAR
      (
        300
      ) NOT NULL,
        email VARCHAR
      (
        74
      ) NOT NULL,
        name VARCHAR
      (
        60
      ) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY
      (
        id_goings_on
      )
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('goings_on', true);
  }
}
