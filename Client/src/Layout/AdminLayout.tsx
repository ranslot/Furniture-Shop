import { Redirect, Route, Switch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getDataWithAutorization } from "../Utils/httpRequest";
import { Suspense, lazy } from "react";

import SideBar from "../Components/SideBar";
import Loading from "../Components/Loading";
import Navigation from "../Components/Navigation";

import Dashboard from "../Page/Admin/Dashboard";

const ProductAdminDashboard = lazy(
  () => import("../Page/Admin/ProductAdminDashboard"),
);
const PaymentAdminDashboard = lazy(
  () => import("../Page/Admin/PaymentAdminDashboard"),
);
const UserAdminDashboard = lazy(
  () => import("../Page/Admin/UserAdminDashboard"),
);

type AdminUserData = {
  user: User;
};

export default function AdminLayout() {
  const { data, error, isLoading } = useQuery<AdminUserData>({
    queryKey: ["user"],
    queryFn: () => getDataWithAutorization(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.user.isAdmin || error) {
    // Absolute path with ~
    return <Redirect to="~/home" />;
  } else {
    return (
      <>
        <header>
          <Navigation user={data.user} />
        </header>
        <Suspense fallback={<Loading />}>
          <SideBar>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/payments" component={PaymentAdminDashboard} nest />
              <Route path="/products" component={ProductAdminDashboard} nest />
              <Route path="/users" component={UserAdminDashboard} nest />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </SideBar>
        </Suspense>
      </>
    );
  }
}
