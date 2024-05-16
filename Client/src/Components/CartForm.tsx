import { useFormContext } from "react-hook-form";
import useCartStore from "../Utils/cartStore";

export default function CartForm() {
  const { products } = useCartStore();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2>Cart</h2>
      <input name="creditCard" {...register} placeholder="Credit Card Number" />
      {/* {errors.creditCard && <p>{errors.creditCard.message}</p>} */}
    </>
  );
}
