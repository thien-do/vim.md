import "@moai/core/font/local.css";
import "@moai/core/index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DummyApp } from "./dummy/app/app";
import { Store } from "./store/store";

const store: Store | undefined = (window as any).backend?.store;
if (store === undefined) throw Error("Store is not defined");

ReactDOM.render(
	<React.StrictMode>
		<DummyApp store={store} />
	</React.StrictMode>,
	document.getElementById("root")
);
