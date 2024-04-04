export default class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class QueryError extends Error {
  constructor() {
    super();
    this.name = "DatabaseError";
    this.type =
      "NonNull" | "UniqueConstraint" | "CheckConstraint" | "ForeignKey"; // etc...
    this.table = string; // Can this be typed to all known tables
    this.field = string; // Can this by typed to all known fields
    this.message = string;
  }
}
