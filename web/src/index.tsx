import "@moai/core/dist/font/local.css";
import "@moai/core/dist/bundle.css";
import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./app/app";
import "./index.css";
import { Store } from "./store/interface";
import "./theme/theme";
import { localStore } from "./store/local";

const store: Store = (window as any).backend?.store ?? localStore;

render(
	<StrictMode>
		<App store={store} />
	</StrictMode>,
	document.getElementById("root")
);
