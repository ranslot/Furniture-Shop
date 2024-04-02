import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
  pgSchema,
} from "drizzle-orm/pg-core";

export const Furniture_Shop_Schema = pgSchema("Furniture_Shop");

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const userAddress = pgTable("user_address", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  addressLine: varchar("address_line", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  district: varchar("district", { length: 255 }).notNull(),
  subdistrict: varchar("subdistrict", { length: 255 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  userId: integer("user_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .references(() => category.id)
    .notNull(),
  sku: varchar("SKU", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const orderDetails = pgTable("order_details", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => user.id)
    .notNull(),
  total: integer("total").notNull(),
  deliveryStatus: varchar("delivery_status", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});

export const paymentDetails = pgTable("payment_details", {
  id: serial("id").primaryKey(),
  orderDetailsId: integer("orderDetails_id")
    .references(() => orderDetails.id)
    .notNull()
    .unique(),
  token: varchar("token", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});
