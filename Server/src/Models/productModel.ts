import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/conection";
import { eq, sql } from "drizzle-orm";

const db = drizzle(connection, { schema });

export function getAllProducts() {}

export function getProductById(id: number) {}

export function getProductByCategory(category: string) {}

export function createProduct<T>(data: T) {}

export function updateProduct<T>(data: T) {}

export function deleteProduct<T>(data: T) {}
