import "@moai/core/dist/font/local.css";
import "@moai/core/dist/bundle.css";
import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./app/app";
import "./index.css";
import { Store } from "./store/interface";
import "./theme/theme";

const store: Store | undefined = (window as any).backend?.store;
if (store === undefined) throw Error("Store is not defined");

render(
	<StrictMode>
		<App store={store} />
	</StrictMode>,
	document.getElementById("root")
);
