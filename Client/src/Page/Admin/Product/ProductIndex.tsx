import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getData } from "../../../Utils/httpRequest";

export default function ProductIndex() {
  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["user"],
    queryFn: () => getData("/product"),
  });

  if (isLoading) return <>XDD</>;

  if (error) return <>DDDXXX</>;

  console.log(data);

  const pid = 1;
  return (
    <>
      ProductIndex
      <Link to="/add">add product</Link>
      <Link to={`/edit/${pid}`}>Edit product</Link>
      <Link to={`/${pid}`}>Show product</Link>
    </>
  );
}
