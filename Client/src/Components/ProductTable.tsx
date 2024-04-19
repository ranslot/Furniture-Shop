import { useLocation } from "wouter";

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, navigate] = useLocation();

  return (
    <div className="w-full overflow-x-auto  ">
      <table className="table table-lg border">
        <thead>
          <tr>
            <th className="text-center">SKU</th>
            <th className="text-center">Name</th>
            <th className="text-center">Description</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              className="hover cursor-pointer"
              key={product.sku}
              onClick={() => navigate(`/${product.productId}`)}
            >
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td className="overflow-x-auto">
                {product.description || "None"}
              </td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
