import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Tiptap from "../Tiptap"
import { Posts } from "./Home/Posts"

export function Dashboard() {
  let { path, url } = useRouteMatch()
  return (
    <div>
      <Sidebar />
      <div
        style={{
          marginLeft: 260,
          padding: 20,
        }}
      >
        <Switch>
          <Route path="/edit">
            <Tiptap />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
