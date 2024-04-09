import { Redirect, Route, Switch } from "wouter";
import { Suspense, lazy } from "react";
import HomeLayout from "./Layout/HomeLayout";
import Loading from "./Components/Loading";

const AdminLayout = lazy(() => import("./Layout/AdminLayout"));
const AuthenticationLayout = lazy(
  () => import("./Layout/AuthenticationLayout"),
);
const ProductLayout = lazy(() => import("./Layout/ProductLayout"));
const UserLayout = lazy(() => import("./Layout/UserLayout"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={HomeLayout} />
        <Route path="/admin" nest>
          <AdminLayout />
        </Route>
        <Route path="/auth/:page" component={AuthenticationLayout} />
        <Route path="/product/:id" component={ProductLayout} />
        <Route path="/user/:id" component={UserLayout} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  );
}
