import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getData } from "../../../Utils/httpRequest";
import ProductTable from "../../../Components/ProductTable";

export default function ProductIndex() {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getData("product"),
  });

  if (isLoading) {
    return <>XDD</>;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (data) {
    return (
      <div className="flex flex-col items-center gap-5 pt-7">
        <div className="flex flex-row gap-3">
          <Link to="/add" className="btn btn-square btn-primary w-[150px] px-1">
            Add New Product
          </Link>
        </div>
        <main>
          <ProductTable products={data} />
        </main>
      </div>
    );
  }
}
