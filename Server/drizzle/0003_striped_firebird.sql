DROP TABLE "test";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "token" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "token" DROP NOT NULL;--> statement-breakpoint
DROP SCHEMA "my_schema";
