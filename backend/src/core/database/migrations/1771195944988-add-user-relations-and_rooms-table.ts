import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRelationsAndRoomsTable1771195944988 implements MigrationInterface {
    name = 'AddUserRelationsAndRoomsTable1771195944988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "name" character varying(255) NOT NULL, "inviteCode" character varying(255) NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "UQ_853f347c1bbaada6e8394f5be26" UNIQUE ("inviteCode"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_65283be59094a73fed31ffeee4" ON "room" ("ownerId") `);
        await queryRunner.query(`CREATE TYPE "public"."task-room-members_role_enum" AS ENUM('owner', 'participant')`);
        await queryRunner.query(`CREATE TYPE "public"."task-room-members_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "task-room-members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "taskRoomId" uuid NOT NULL, "userId" uuid NOT NULL, "invitedByUserId" uuid, "role" "public"."task-room-members_role_enum" NOT NULL DEFAULT 'participant', "status" "public"."task-room-members_status_enum" NOT NULL DEFAULT 'pending', "acceptedAt" TIMESTAMP WITH TIME ZONE, "declinedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "uq_room_user" UNIQUE ("taskRoomId", "userId"), CONSTRAINT "PK_4026b98ad33335390da3d0a40fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_room_status" ON "task-room-members" ("taskRoomId", "status") `);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_65283be59094a73fed31ffeee4e" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task-room-members" ADD CONSTRAINT "FK_3ad3f582a5ea2f0b869b386a8e7" FOREIGN KEY ("taskRoomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task-room-members" ADD CONSTRAINT "FK_5313f02a7dc07842c0d1cd096df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task-room-members" ADD CONSTRAINT "FK_a11c578aebc076712ed45643b2a" FOREIGN KEY ("invitedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task-room-members" DROP CONSTRAINT "FK_a11c578aebc076712ed45643b2a"`);
        await queryRunner.query(`ALTER TABLE "task-room-members" DROP CONSTRAINT "FK_5313f02a7dc07842c0d1cd096df"`);
        await queryRunner.query(`ALTER TABLE "task-room-members" DROP CONSTRAINT "FK_3ad3f582a5ea2f0b869b386a8e7"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_65283be59094a73fed31ffeee4e"`);
        await queryRunner.query(`DROP INDEX "public"."idx_room_status"`);
        await queryRunner.query(`DROP TABLE "task-room-members"`);
        await queryRunner.query(`DROP TYPE "public"."task-room-members_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task-room-members_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65283be59094a73fed31ffeee4"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
