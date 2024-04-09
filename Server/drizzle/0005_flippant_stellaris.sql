CREATE TABLE IF NOT EXISTS "product_img" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"imageUrl" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now(),
	CONSTRAINT "product_img_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_img" ADD CONSTRAINT "product_img_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
