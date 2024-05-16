import { useQuery } from "@tanstack/react-query";
import PaymentForm from "../Components/PaymentForm";
import UserAddressForm from "../Components/UserAddressForm";
import { getDataWithAuth } from "../Utils/httpRequest";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CartForm from "../Components/CartForm";

type CheckOutProps = {
  user: User;
};

type UserAddress = {
  //
};

export default function CheckOut({ user }: CheckOutProps) {
  const { error, data } = useQuery<UserAddress>({
    queryKey: ["user_address", user],
    queryFn: () => getDataWithAuth(`address/${user.id}`),
  });

  const methods = useForm<>({
    resolver: zodResolver(),
  });

  if (error) {
    return <>XDD</>;
  }

  return (
    <main className="flex flex-col gap-1 md:flex-row">
      <FormProvider {...methods}>
        <form action={methods.handleSubmit(onSubmit)}>
          <CartForm />
          <UserAddressForm user={data} />
          <PaymentForm />
          <button type="submit"></button>
        </form>
      </FormProvider>
    </main>
  );
}
