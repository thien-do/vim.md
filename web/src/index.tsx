import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app/app";
import { Store } from "./store/store";
import "@moai/core/index.css";
import "@moai/core/font/local.css";

const store: Store | undefined = (window as any).backend?.store;

console.log(store);

if (store === undefined) throw Error("Store is not defined");

ReactDOM.render(
	<React.StrictMode>
		<App store={store} />
	</React.StrictMode>,
	document.getElementById("root")
);
