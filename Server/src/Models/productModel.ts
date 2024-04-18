import { product, category, productImg } from "./Schema/databaseSchema";
import { db } from "../../Database/connection";
import { eq, sql } from "drizzle-orm";
import { PostgresError } from "postgres";

export function getAllProducts() {
  return db
    .select({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: category.name,
      productImgs: sql<string[]>`array_agg(${productImg.imageName})`,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .leftJoin(productImg, eq(productImg.productId, product.id));
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
    let cat = await db
      .insert(category)
      .values({ name: data.category })
      .onConflictDoNothing()
      .returning({ categoryId: category.id });

    if (cat.length === 0) {
      cat = await db
        .select({ categoryId: category.id })
        .from(category)
        .where(eq(category.name, data.category));
    }

    const prod = await db
      .insert(product)
      .values({
        categoryId: cat[0].categoryId,
        sku: data.sku,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
      })
      .returning({ productId: product.id });

    result.success = true;
    result.productId = prod[0].productId;
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
        .insert(productImg)
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
