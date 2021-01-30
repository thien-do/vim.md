import { BrowserWindow, Rectangle } from "electron";
import Store from "electron-store";
import path from "path";

// dirname === desktop/dist/window
const root = path.resolve(__dirname, "../../");
if (root.endsWith("desktop") === false) throw Error("Root should be desktop");

const store = new Store();

const getBounds = (): Rectangle | undefined => {
	const bounds = store.get("winBounds");
	if (typeof bounds === "object") return bounds as Rectangle;
	return undefined;
};

export const createWindow = () => {
	const win = new BrowserWindow({
		...getBounds(),
		webPreferences: {
			preload: path.resolve(root, "dist/preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});
	win.loadFile(path.resolve(root, "static/index.html"));
	win.on("close", () => void store.set("winBounds", win.getBounds()));
	win.webContents.openDevTools();
};
