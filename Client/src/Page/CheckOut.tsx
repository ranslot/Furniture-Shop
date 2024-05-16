import { useQuery } from "@tanstack/react-query";
import PaymentForm from "../Components/PaymentForm";
import UserAddressForm from "../Components/UserAddressForm";
import { getDataWithAuth } from "../Utils/httpRequest";
import * as z from "zod";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CartForm from "../Components/CartForm";
import { userAddressSchema } from "../Utils/formSchema";

type CheckOutProps = {
  user: User;
};

type UserAddress = z.infer<typeof userAddressSchema>;

type CheckOutFormData = {
  address: UserAddress;
  cart: unknown;
  payment: unknown;
};

export default function CheckOut({ user }: CheckOutProps) {
  const { error, data } = useQuery<UserAddress>({
    queryKey: ["user_address", user],
    queryFn: () => getDataWithAuth(`address/${user.id}`),
  });

  const methods = useForm<CheckOutFormData>({
    resolver: zodResolver(userAddressSchema),
  });

  const onSubmit: SubmitHandler<CheckOutFormData> = (formData) => {
    console.log(formData);
  };

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <main className="flex flex-col gap-1 md:flex-row">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CartForm />
          <UserAddressForm {...data} />
          <PaymentForm />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </main>
  );
}
