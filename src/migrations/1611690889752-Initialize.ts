import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1611690889752 implements MigrationInterface {
  name = 'Initialize1611690889752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `twitterId` varchar(255) NOT NULL, `name` varchar(255) CHARACTER SET "utf8mb4" NOT NULL, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `avatar` varchar(255) NULL, `token` varchar(255) NOT NULL, `tokenSecret` varchar(255) NOT NULL, `circleExpiresAt` timestamp NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`',
    );
    await queryRunner.query('DROP TABLE `users`');
  }
}
