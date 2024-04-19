import { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "wouter";

const ProductShowAdmin = lazy(() => import("./Product/ProductShowAdmin"));
const ProductIndex = lazy(() => import("./Product/ProductIndex"));
const ProductAddForm = lazy(() => import("./Product/ProductAddForm"));
const ProductEditForm = lazy(() => import("./Product/ProductEditForm"));

export default function ProductAdminDashboard() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Switch>
          <Route path="/" component={ProductIndex} />
          <Route path="/add" component={ProductAddForm} />
          <Route path="/edit/:sku" component={ProductEditForm} />
          <Route path="/:sku" component={ProductShowAdmin} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
