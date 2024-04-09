import { Link, useParams } from "wouter";

export default function ProductShowAdmin() {
  const { id } = useParams();
  return (
    <>
      <Link to="/">back to products</Link>
      {+id!}
    </>
  );
}
