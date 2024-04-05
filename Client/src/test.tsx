import { UseQueryResult } from "@tanstack/react-query";

export default function Test(user: UseQueryResult<User, Error>) {
  if (!user.data)
    return (
      <>
        <h1>Testt</h1>
        <p>Guest</p>
      </>
    );
  else if (user.data.isAdmin) {
    return (
      <>
        <h1>Testt</h1>
        <p>Admin</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Testt</h1>
        <p>User</p>
      </>
    );
  }
}
