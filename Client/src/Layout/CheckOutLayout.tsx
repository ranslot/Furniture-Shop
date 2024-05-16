import { useQuery } from "@tanstack/react-query";
import { getDataWithAuth } from "../Utils/httpRequest";
import Loading from "../Components/Loading";
import { Redirect } from "wouter";
import CheckOut from "../Page/CheckOut";
import Navigation from "../Components/Navigation";

type UserRole = {
  user: User | null;
  isUser: boolean;
};

export default function CheckOutLayout() {
  const { isPending, error, data } = useQuery<UserRole>({
    queryKey: ["user"],
    queryFn: () => getDataWithAuth(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (data && !data.isUser) {
    return <Redirect to="/auth/login" />;
  }

  if (data.user && data.user.isAdmin) {
    //Admin
    return <Redirect to="/admin" />;
  }

  if (data.user && data.isUser) {
    return (
      <>
        <Navigation user={data.user} />
        <div className="pt-[64px]">
          <CheckOut user={data.user} />
        </div>
      </>
    );
  }
}
