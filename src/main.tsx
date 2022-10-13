import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";

import Entry from "./Entry";

import "./index.css";

import "antd/dist/antd.min.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
