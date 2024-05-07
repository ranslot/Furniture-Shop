import { useQuery } from "@tanstack/react-query";
import { getData } from "../Utils/httpRequest";
import useCartStore from "../Utils/cartStore";

export default function Home() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getData("product"),
  });

  const { addToCart } = useCartStore();

  if (isLoading) {
    return <>Loading....</>;
  }

  if (error || !data) {
    return <>Error</>;
  }

  return (
    <>
      <main className=" mx-auto flex w-[100%] max-w-[1300px] flex-row flex-wrap justify-center gap-3 p-5  ">
        {data.map((product) => (
          <div
            className="card w-96 transform-gpu  bg-base-100 shadow-xl transition-transform hover:z-10 hover:scale-105"
            key={product.productId}
          >
            <figure className="h-[243px] cursor-pointer">
              <img
                // src={IMG_URL + product.productImage[0]}
                src={product.productImgs[0]}
                alt={product.name}
                height="243"
                width="383.99"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title cursor-pointer">product.name</h2>
              <p>{product.description || "None"}</p>
              <h3 className="my-auto text-right font-bold">
                {"Price " + product.price + ". Baht"}
              </h3>
              <div className="card-actions justify-end gap-3">
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
