import { useQuery } from "@tanstack/react-query";
import { getData } from "../Utils/httpRequest";
import useCartStore from "../Utils/cartStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getData("product"),
  });

  const { addToCart } = useCartStore();

  const [amounts, setAmounts] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setAmounts(Array(data.length).fill(DEFAULT_AMOUNT));
    }
  }, [data]);

  if (isLoading) {
    return <>Loading....</>;
  }

  if (error || !data) {
    return <>Error</>;
  }

  const DEFAULT_AMOUNT = 1;
  const products = data.map((d) => ({ ...d, amount: DEFAULT_AMOUNT }));

  return (
    <>
      <main className=" mx-auto flex w-[100%] max-w-[1300px] flex-row flex-wrap justify-center gap-3 p-5  ">
        {products.map((product) => (
          <div
            className="card w-96 transform-gpu bg-base-100 shadow-xl transition-transform hover:z-10 hover:scale-105"
            key={product.productId}
          >
            <figure className="h-[243px] cursor-pointer">
              <img
                src={product.productImgs[0]}
                alt={product.name}
                height="243"
                width="383.99"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title cursor-pointer">product.name</h2>
              <p>{product.description ?? "ไม่มีรายละเอียด"}</p>
              <h3 className="my-auto text-right font-bold">
                {"ราคา " + product.price + " บาท"}
              </h3>
              <div className="card-actions justify-end gap-3">
                <div>
                  <p>จำนวน</p>
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      product.amount = product.amount - 1;
                      setAmounts((prev) => ({
                        ...prev,
                        [product.productId]: amounts[product.productId]--,
                      }));
                    }}
                  >
                    -
                  </button>
                  {amounts[product.productId]}
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      product.amount = product.amount + 1;
                      setAmounts((prev) => ({
                        ...prev,
                        [product.productId]: amounts[product.productId]++,
                      }));
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-primary z-20"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
