import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";
import { Redirect } from "wouter";

import Navigation from "../Components/Navigation";
import Loading from "../Components/Loading";

import Home from "../Page/Home";

type UserRole = {
  user: User | null;
  isUser: boolean;
};

export default function HomeLayout() {
  const { isPending, error, data } = useQuery<UserRole>({
    queryKey: ["user"],
    queryFn: () => getDataWithAutorization(),
  });

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  if (data.user && data.user.isAdmin) {
    //Admin
    return <Redirect to="/admin" />;
  } else {
    // User or Guest
    return (
      <>
        <Navigation user={data.user} />
        <div className="pt-[64px]">
          <Home />
        </div>
      </>
    );
  }
}
