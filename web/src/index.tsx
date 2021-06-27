import "@moai/core/dist/font/local.css";
import "@moai/core/dist/bundle.css";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { render } from "react-dom";
import { App } from "./app/app";
import "./index.css";
import "./theme/theme";

render(
	<StrictMode>
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</StrictMode>,
	document.getElementById("root")
);
