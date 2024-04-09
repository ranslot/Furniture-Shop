import { Redirect, Route, Switch } from "wouter";
import { Suspense, lazy } from "react";

import Loading from "./Components/Loading";

const AuthenticationLayout = lazy(
  () => import("./Layout/AuthenticationLayout"),
);
const HomeLayout = lazy(() => import("./Layout/HomeLayout"));
const ProductLayout = lazy(() => import("./Layout/ProductLayout"));
const UserLayout = lazy(() => import("./Layout/UserLayout"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={HomeLayout} />
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
