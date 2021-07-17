import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
const App = lazy(() => import("./components/App/App.js"));
import Loader from "./components/Loader/Loader";
ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  document.getElementById("app")
);
