import { Provider } from "jotai";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.less";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function Main() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
