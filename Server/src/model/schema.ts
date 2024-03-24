import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("my_schema");

export const mySchemaUsers = pgTable("test", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
