import { Redirect, Route, Switch } from "wouter";
import AuthenticationLayout from "./Layout/AuthenticationLayout";
import AppLayout from "./Layout/AppLayout";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={AppLayout} />
      <Route path="/auth/:page" component={AuthenticationLayout} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
