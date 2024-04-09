import { PropsWithChildren } from "react";
import { useLocation } from "wouter";

export default function SideBar({ children }: PropsWithChildren) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();
  return (
    <div className="drawer drawer-open  mt-[64px]">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side ">
        <ul className="w-30 menu min-h-full bg-base-200 p-4 text-base-content md:w-60">
          <li>
            <button
              onClick={() => setLocation("/")}
              className="text-lg font-bold "
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setLocation("/products")}
              className="text-lg font-bold "
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setLocation("/payments")}
              className="text-lg font-bold "
            >
              Payments
            </button>
          </li>

          <li>
            <button
              onClick={() => setLocation("/users")}
              className="text-lg font-bold "
            >
              Users
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
