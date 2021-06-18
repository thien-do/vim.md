import { contextBridge, ipcRenderer } from "electron";
import { localBackend } from "./backend/local";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		backend: localBackend,
		winClose: async () => {
			await ipcRenderer.invoke("winClose");
		},
	});
});
