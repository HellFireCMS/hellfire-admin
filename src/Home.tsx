import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Login } from "./Pages/Auth/Login";
import { Dashboard } from "./Pages/Dashboard";
import { PrivateRoute } from "./utils/PrivateRoute";

export function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
