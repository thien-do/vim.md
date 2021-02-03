import { contextBridge } from "electron";
import { store } from "./store/store";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		store: store,
	});
});
