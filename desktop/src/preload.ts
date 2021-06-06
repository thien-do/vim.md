import { contextBridge, ipcRenderer } from "electron";
import { localStore } from "./store/local";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		store: localStore,
		winClose: async () => {
			await ipcRenderer.invoke("winClose");
		},
	});
});
