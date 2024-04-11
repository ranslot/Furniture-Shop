import { PropsWithChildren } from "react";
import { Link } from "wouter";

export default function SideBar({ children }: PropsWithChildren) {
  return (
    <div className="drawer drawer-open  ">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content pt-[64px]">{children}</div>
      <div className="drawer-side border-r pt-[64px] shadow">
        <ul className="w-30 menu min-h-full bg-base-200 p-4 text-base-content md:w-60">
          <li>
            <Link
              to="/"
              className="h-16 content-center justify-center  text-lg font-bold"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="h-16 content-center justify-center  text-lg font-bold"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/payments"
              className="h-16 content-center justify-center  text-lg font-bold"
            >
              Payments
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className="h-16 content-center justify-center  text-lg font-bold"
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
