import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2>Payment</h2>
      <input name="creditCard" {...register} placeholder="Credit Card Number" />
      {/* {errors.creditCard && <p>{errors.creditCard.message}</p>} */}
      <input name="expiryDate" {...register} placeholder="Expiry Date" />
      {/* {errors.expiryDate && <p>{errors.expiryDate.message}</p>} */}
    </>
  );
}
