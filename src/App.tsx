import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ApiClient, ApiClientAtom } from "./Api/client";
import { userAtom } from "./Atoms/Auth";
import { Home } from "./Home";

function App() {
  const [user, setUser] = useAtom(userAtom);
  const [apiClient, setApiClient] = useAtom(ApiClientAtom);

  useEffect(() => {
    if (apiClient == undefined && localStorage.getItem("base_url") != null) {
      setApiClient(new ApiClient(localStorage.getItem("base_url")!));
    }
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
