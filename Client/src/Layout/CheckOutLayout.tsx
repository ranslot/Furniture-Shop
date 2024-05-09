import { useQuery } from "@tanstack/react-query";
import { getAutorizationData } from "../Utils/httpRequest";
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
    queryFn: () => getAutorizationData(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (data.user && data.user.isAdmin) {
    //Admin
    return <Redirect to="/admin" />;
  }

  if (!data.isUser) {
    return <Redirect to="/auth/login" />;
  } else {
    return (
      <>
        <Navigation user={data.user} />
        <div className="pt-[64px]">
          <CheckOut />
        </div>
      </>
    );
  }
}
