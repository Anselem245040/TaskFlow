import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTasksTableAndUserRoomUpdates1771479902363 implements MigrationInterface {
    name = 'AddedTasksTableAndUserRoomUpdates1771479902363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_entity_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "title" character varying(255) NOT NULL, "description" text NOT NULL, "status" "public"."task_entity_status_enum" NOT NULL DEFAULT 'TODO', "dueDate" TIMESTAMP, "roomId" uuid, "createdById" uuid NOT NULL, "assignedToId" uuid, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48f2f7e1ebff154772dc99fb41" ON "task_entity" ("status") `);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_4cc98b41d2a9dcc5e1447990b0d" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_aa424257e6c5a4b23a692af0ad0" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_be87452cb0ab8c2b18a666eea80" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_be87452cb0ab8c2b18a666eea80"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_aa424257e6c5a4b23a692af0ad0"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_4cc98b41d2a9dcc5e1447990b0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48f2f7e1ebff154772dc99fb41"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TYPE "public"."task_entity_status_enum"`);
    }

}
