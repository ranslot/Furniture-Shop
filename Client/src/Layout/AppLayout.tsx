import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";

function AppLayout() {
  const { isPending, error, data } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => getDataWithAutorization(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data)
    return (
      <>
        <h1>App</h1>
        <p>Guest</p>
      </>
    );
  else if (data.isAdmin) {
    return (
      <>
        <h1>App</h1>
        <p>Admin</p>
      </>
    );
  } else {
    return (
      <>
        <h1>App</h1>
        <p>User</p>
      </>
    );
  }
}

export default AppLayout;
