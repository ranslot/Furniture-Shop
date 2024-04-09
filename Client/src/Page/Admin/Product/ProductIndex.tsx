import { Link } from "wouter";

export default function ProductIndex() {
  const pid = 1;
  return (
    <>
      ProductIndex
      <Link to="/add">add product</Link>
      <Link to={`/${pid}`}>Show product</Link>
    </>
  );
}
