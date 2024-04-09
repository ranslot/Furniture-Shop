import { useRoute } from "wouter";
import Product from "../Page/Product";

export default function ProductLayout() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_match, params] = useRoute("/product/:id");

  if (!params) {
    window.location.replace("/");
  } else {
    return (
      <>
        <Product id={+params.id} />
      </>
    );
  }
}
