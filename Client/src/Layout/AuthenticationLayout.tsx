import { Redirect, useRoute } from "wouter";
import Login from "../Page/Login";

export default function Authentication() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_match, params] = useRoute("/auth/:page");

  if (params?.page === "login") {
    return <Login />;
  }
  if (params?.page === "register") {
    return null;
  }

  return <Redirect to="/" />;
}
