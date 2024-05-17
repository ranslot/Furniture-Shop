import { useFormContext } from "react-hook-form";
import { userOrderSchema } from "../Utils/formSchema";
import * as z from "zod";

type UserAddress = Partial<z.infer<typeof userOrderSchema>>;

export default function UserAddressForm(address: UserAddress) {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserAddress>();

  return (
    <>
      <h2>Address</h2>
      <input
        name="address"
        {...register}
        defaultValue={address.addressLine || ""}
        placeholder="Address"
      />
      {errors.addressLine && <p>{errors.addressLine.message}</p>}
      <input
        name="city"
        {...register}
        defaultValue={address.city || ""}
        placeholder="City"
      />
      {errors.city && <p>{errors.city.message}</p>}
    </>
  );
}
