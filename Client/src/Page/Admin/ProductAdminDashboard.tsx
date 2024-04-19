import { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "wouter";

import ProductIndex from "./Product/ProductIndex";
const ProductEditAdmin = lazy(() => import("./Product/ProductEditAdmin"));
const ProductAddForm = lazy(() => import("./Product/ProductAddForm"));

export default function ProductAdminDashboard() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Switch>
          <Route path="/" component={ProductIndex} />
          <Route path="/add" component={ProductAddForm} />
          <Route path="/:id" component={ProductEditAdmin} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
