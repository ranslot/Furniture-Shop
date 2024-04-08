import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";
import Navigation from "../Components/Navigation";

function AppLayout() {
  const { isPending, error, data } = useQuery<User | string>({
    queryKey: ["user"],
    queryFn: () => getDataWithAutorization(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (typeof data === "string")
    return (
      <>
        <Navigation user={data} />
        <h1>App</h1>
        <p>Guest</p>
      </>
    );
  else if (data.isAdmin) {
    return (
      <>
        <Navigation user={data} />
        <div className="mt-36 ">
          <h1>App</h1>
          <p>Admin</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navigation user={data} />
        <h1>App</h1>
        <p>User</p>
      </>
    );
  }
}

export default AppLayout;
