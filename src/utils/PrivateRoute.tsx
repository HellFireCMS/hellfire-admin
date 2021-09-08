import { useAtom } from "jotai";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userAtom } from "../Atoms/Auth";
import { configAtom } from "../Atoms/Config";

export function PrivateRoute({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const [user] = useAtom(userAtom);
  const [config] = useAtom(configAtom);
  console.log(user);
  return (
    <Route
      path={path}
      render={({ location }) =>
        user != undefined && config.backendUrl != undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: location.pathname,
            }}
          />
        )
      }
    />
  );
}
