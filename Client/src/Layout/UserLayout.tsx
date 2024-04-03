import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "../helpers/httpRequest";

function UserLayout() {
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByToken(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <h1>{data.role}</h1>;
}

export default UserLayout;
