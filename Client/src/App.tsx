import { Redirect, Route, Switch } from "wouter";
import Test from "./test";
import GuestLayout from "./Layout/GuestLayout";
import AuthenticationLayout from "./Layout/AuthenticationLayout";
import UserLayout from "./Layout/UserLayout";
import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "./helpers/httpRequest";

export default function App() {
  const userAuthQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByToken(),
  });
  return (
    <Switch>
      <Route path="/">
        <Test {...userAuthQuery} />
      </Route>
      <Route path="/g" component={GuestLayout} />
      <Route path="/u" component={UserLayout} />
      <Route path="/auth/:page">
        <AuthenticationLayout {...userAuthQuery} />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
