import { Link } from "wouter";
import CartDropdown from "./CartDropdown";
import UserDropdown from "./UserDropdown";

type NavigationProps = {
  user: User | null;
};

export default function Navigation({ user }: NavigationProps) {
  return (
    <nav className="navbar absolute top-0 border bg-base-100 px-6 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <CartDropdown></CartDropdown>
        {user ? (
          //User
          <UserDropdown user={user}></UserDropdown>
        ) : (
          //Guest
          <div className="flex flex-row gap-4">
            <Link
              to="/auth/Register"
              className="btn btn-square  btn-secondary  mx-auto w-[115px] text-lg"
            >
              Register
            </Link>
            <Link
              to="/auth/Login"
              className="btn btn-square  btn-primary mx-auto w-[100px] text-lg"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
