import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/connection";
import { eq, sql } from "drizzle-orm";
import { PostgresError } from "postgres";

const db = drizzle(connection, { schema });

export function getAllProducts() {}

export function getProductById(id: number) {}

export function getProductByCategory(category: string) {}

export function storeProduct(data: Omit<Product, "productImage">, imgNames: string[]) {
  return db.transaction(async (tx) => {
    try {
      let category = await tx
        .insert(schema.category)
        .values({ name: data.category })
        .onConflictDoNothing()
        .returning({ categoryId: schema.category.id });

      if (category.length === 0) {
        category = await tx
          .select({ categoryId: schema.category.id })
          .from(schema.category)
          .where(eq(schema.category.name, data.category));
      }

      try {
        const product = await tx
          .insert(schema.product)
          .values({
            categoryId: category[0].categoryId,
            sku: data.sku,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
          })
          .returning({ productId: schema.product.id });
        for (const imgName of imgNames) {
          await tx.insert(schema.productImg).values({ productId: product[0].productId, imageName: imgName });
        }
      } catch (error) {
        throw new PostgresError("SKU already existed");
      }
    } catch (error) {
      tx.rollback();
    }
  });
}

export function updateProduct<T>(data: T) {}

export function deleteProduct<T>(data: T) {}
