import { render } from "@vimdotmd/editor";
import { contextBridge, ipcRenderer } from "electron";
import { store } from "./store/store";

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("backend", {
		get42: async () => ipcRenderer.invoke("get-42"),
		render: async () => void render(store),
	});
});
