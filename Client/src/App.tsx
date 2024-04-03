import { Redirect, Route, Switch } from "wouter";
import Test from "./test";
import Guest from "./Layout/GuestLayout";
import Authentication from "./Layout/AuthenticationLayout";

function App() {
  return (
    <Switch>
      <Route path="/" component={Test} />
      <Route path="/g" component={Guest} />
      <Route path="/auth/:page" component={Authentication} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
