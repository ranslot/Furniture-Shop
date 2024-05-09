import { useQuery } from "@tanstack/react-query";
import { getData } from "../Utils/httpRequest";
import useCartStore from "../Utils/cartStore";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

export default function Home() {
  const DEFAULT_AMOUNT = 1;

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getData("product"),
  });

  const { addToCart } = useCartStore();

  const [amounts, setAmounts] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      const defaultAmounts: number[] = Array(data.length).fill(DEFAULT_AMOUNT);
      setAmounts(defaultAmounts);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (data) {
    return (
      <>
        <main className=" mx-auto flex w-[100%] max-w-[1300px] flex-row flex-wrap justify-center gap-3 p-5  ">
          {data.map((product, index) => (
            <div
              className="card w-96 transform-gpu bg-base-100 shadow-xl transition-transform hover:z-10 hover:scale-105"
              key={index}
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
                <h2 className="card-title cursor-pointer">{product.name}</h2>
                <p className="text-gray-400">
                  {"สินค้าคงเหลือ : " + product.quantity}
                </p>
                <h3 className="mx-1 my-auto text-right font-bold">
                  {"ราคา " + product.price + " บาท"}
                </h3>
                <div className="card-actions justify-end gap-3">
                  <div className="my-auto flex flex-row">
                    <p className="text-gray-500">จำนวน</p>
                    <button
                      className="btn btn-xs mx-2"
                      onClick={() => {
                        setAmounts((prev) => ({
                          ...prev,
                          [index]:
                            amounts[index] >= DEFAULT_AMOUNT
                              ? amounts[index]--
                              : DEFAULT_AMOUNT,
                        }));
                      }}
                    >
                      -
                    </button>
                    {amounts[index]}
                    <button
                      className="btn btn-xs mx-2"
                      onClick={() => {
                        setAmounts((prev) => ({
                          ...prev,
                          [index]:
                            amounts[index] <= product.quantity
                              ? amounts[index]++
                              : product.quantity,
                        }));
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-primary z-20 "
                    onClick={() => addToCart(product, amounts[index])}
                  >
                    หยิบใส่ตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </>
    );
  }
}
