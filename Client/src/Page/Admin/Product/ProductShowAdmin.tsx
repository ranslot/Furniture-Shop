import { Link, useParams } from "wouter";

export default function ProductShowAdmin() {
  const { sku } = useParams();
  return (
    <>
      <Link to="/">back to products</Link>
      {sku!}
    </>
  );
}
