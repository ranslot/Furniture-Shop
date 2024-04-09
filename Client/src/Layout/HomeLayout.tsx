import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";
import Navigation from "../Components/Navigation";
import Loading from "../Components/Loading";
import Home from "../Page/Home";
import Dashboard from "../Page/Admin/Dashboard";

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

  if (data.isUser && data.user && data.user.isAdmin) {
    return (
      <>
        <Navigation user={data.user} />
        <div className="mt-[64px] ">
          <Dashboard />
        </div>
      </>
    );
  } else {
    // User or Guest
    return (
      <>
        <Navigation user={data.user} />
        <div className="mt-[64px]">
          <Home />
        </div>
      </>
    );
  }
}
