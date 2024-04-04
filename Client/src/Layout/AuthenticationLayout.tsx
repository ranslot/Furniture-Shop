import { Redirect, useRoute } from "wouter";
import Login from "../Page/Login";
import Register from "../Page/Register";

export default function Authentication() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_match, params] = useRoute("/auth/:page");

  if (params?.page === "login" || params?.page === "Login") {
    return <Login></Login>;
  }

  if (params?.page === "register" || params?.page === "Register") {
    return (
      <div className="flex align-middle justify-center h-svh  ">
        <Register></Register>
      </div>
    );
  }

  return <Redirect to="/" />;
}
