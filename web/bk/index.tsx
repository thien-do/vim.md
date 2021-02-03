import { render as reactRender } from "react-dom";
import { App } from "./app/app";
import { Store } from "./store/store";

export { Store };

export const render = (store: Store) => {
	reactRender(<App store={store} />, document.getElementById("root"));
};
