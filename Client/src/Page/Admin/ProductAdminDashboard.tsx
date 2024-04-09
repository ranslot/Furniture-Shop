import { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "wouter";

const ProductShowAdmin = lazy(() => import("./Product/ProductShowAdmin"));
const ProductIndex = lazy(() => import("./Product/ProductIndex"));
const ProductStore = lazy(() => import("./Product/ProductStore"));

export default function ProductAdminDashboard() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Switch>
          <Route path="/" component={ProductIndex} />
          <Route path="/add" component={ProductStore} />
          <Route path="/edit/:id" component={ProductStore} />
          <Route path="/:id" component={ProductShowAdmin} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
