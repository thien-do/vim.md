import { ipcRenderer, contextBridge } from "electron";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		get42: async () => ipcRenderer.invoke("get-42"),
	});
});
