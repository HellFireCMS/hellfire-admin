import { useAtom } from "jotai";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Login } from "./Pages/Auth/Login";
import Tiptap from "./Tiptap";
import { PrivateRoute } from "./utils/PrivateRoute";

export function Home() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Tiptap />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
