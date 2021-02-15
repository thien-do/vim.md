import "@moai/core/dist/font/local.css";
import "@moai/core/dist/index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app/app";
import "./index.css";
import { Store } from "./store/store";
import "./theme/theme";

const store: Store | undefined = (window as any).backend?.store;
if (store === undefined) throw Error("Store is not defined");

ReactDOM.render(
	<React.StrictMode>
		<App store={store} />
	</React.StrictMode>,
	document.getElementById("root")
);
