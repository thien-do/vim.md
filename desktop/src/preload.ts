import { contextBridge, ipcRenderer } from "electron";
import { store } from "./store/store";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		store: store,
		winClose: async () => {
			await ipcRenderer.invoke("winClose");
		},
	});
});
