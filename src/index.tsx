import React from "react";
import ReactDOM from "react-dom/client";
import ChargePoints from "./ChargePoints.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChargePoints />
  </React.StrictMode>
);
