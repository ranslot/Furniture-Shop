import { Link, Redirect, useRoute } from "wouter";
import Login from "../Page/Login";
import Register from "../Page/Register";

export default function Authentication() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_match, params] = useRoute("/auth/:page");

  if (params?.page === "login" || params?.page === "Login") {
    return (
      <div className="flex h-screen flex-col  items-center justify-center gap-10">
        <Link to="/" className="text-4xl font-bold">
          Home
        </Link>
        <Login></Login>
      </div>
    );
  }

  if (params?.page === "register" || params?.page === "Register") {
    return (
      <div className="flex h-screen flex-col  items-center justify-center gap-10">
        <Link to="/" className="text-4xl font-bold">
          Home
        </Link>
        <Register></Register>
      </div>
    );
  }

  return <Redirect to="/" />;
}
