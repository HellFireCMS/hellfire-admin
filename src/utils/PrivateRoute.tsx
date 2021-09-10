import { useAtom } from "jotai";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { ApiClientAtom } from "../Api/client";
import { userAtom } from "../Atoms/Auth";

export function PrivateRoute({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const [user] = useAtom(userAtom);
  const [apiClient] = useAtom(ApiClientAtom);
  console.log(user);
  return (
    <Route
      path={path}
      render={({ location }) =>
        !(user == undefined || apiClient == undefined) ? (
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
