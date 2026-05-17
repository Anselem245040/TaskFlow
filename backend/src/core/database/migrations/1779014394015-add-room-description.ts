import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomDescription1779014394015 implements MigrationInterface {
    name = 'AddRoomDescription1779014394015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "description"`);
    }

}
