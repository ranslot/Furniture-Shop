import { Redirect, Route, Switch } from "wouter";
import { Suspense, lazy } from "react";

import Loading from "./Components/Loading";

import HomeLayout from "./Layout/HomeLayout";
import Alert from "./Components/Alert";

const AdminLayout = lazy(() => import("./Layout/AdminLayout"));
const AuthenticationLayout = lazy(
  () => import("./Layout/AuthenticationLayout"),
);
const ProductLayout = lazy(() => import("./Layout/ProductLayout"));
const UserLayout = lazy(() => import("./Layout/UserLayout"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Alert />
      <Switch>
        <Route path="/" component={HomeLayout} />
        <Route path="/admin" component={AdminLayout} nest />
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
