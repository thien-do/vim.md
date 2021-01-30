import { ipcRenderer, contextBridge } from "electron";
import { render } from "@vimdotmd/editor";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		get42: async () => ipcRenderer.invoke("get-42"),
		render: () => render(),
	});
});
