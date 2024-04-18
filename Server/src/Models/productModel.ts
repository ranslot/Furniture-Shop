import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/connection";
import { eq, sql } from "drizzle-orm";
import { PostgresError } from "postgres";

const db = drizzle(connection, { schema });

export function getAllProducts() {
  return db
    .select({
      productId: schema.product.id,
      sku: schema.product.sku,
      name: schema.product.name,
      description: schema.product.description,
      price: schema.product.price,
      quantity: schema.product.quantity,
      category: schema.category.name,
      productImgs: sql`array_agg(${schema.productImg})`,
    })
    .from(schema.product)
    .leftJoin(
      schema.category,
      eq(schema.product.categoryId, schema.category.id)
    )
    .leftJoin(
      schema.productImg,
      eq(schema.productImg.productId, schema.product.id)
    );
}

export function getProductById(id: number) {}

export function getProductByCategory(category: string) {}

export async function storeProductData(data: Omit<Product, "productImage">) {
  const result = {
    success: false,
    productError: false,
    databaseError: false,
    productId: 0,
  };

  try {
    let category = await db
      .insert(schema.category)
      .values({ name: data.category })
      .onConflictDoNothing()
      .returning({ categoryId: schema.category.id });

    if (category.length === 0) {
      category = await db
        .select({ categoryId: schema.category.id })
        .from(schema.category)
        .where(eq(schema.category.name, data.category));
    }

    const product = await db
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

    result.success = true;
    result.productId = product[0].productId;
    //
  } catch (error) {
    if (
      error instanceof PostgresError &&
      error.constraint_name === "product_SKU_unique"
    ) {
      result.productError = true;
    } else {
      result.databaseError = true;
    }
  }

  return result;
}

export async function storeProductImg(imgNames: string[], productId: number) {
  const result = { success: false, productImgError: false };
  try {
    for (const imgName of imgNames) {
      await db
        .insert(schema.productImg)
        .values({ productId: productId, imageName: imgName });
    }
    result.success = true;
  } catch (error) {
    result.productImgError = true;
  }
  return result;
}

export function updateProduct<T>(data: T) {}

export function deleteProduct<T>(data: T) {}
