import { Redirect, Route, Switch } from "wouter";
import Test from "./test";
import GuestLayout from "./Layout/GuestLayout";
import Authentication from "./Layout/AuthenticationLayout";
import UserLayout from "./Layout/UserLayout";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Test} />
      <Route path="/g" component={GuestLayout} />
      <Route path="/u" component={UserLayout} />
      <Route path="/auth/:page" component={Authentication} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
