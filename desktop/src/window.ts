import { BrowserWindow, ipcRenderer, Rectangle } from "electron";
import Store from "electron-store";
import path from "path";

// This is a little bit tricky:
// - In dev: root/desktop
// - In prod: root/desktop/dist/resources/app.asar (after extracted)
const root = path.resolve(__dirname, "../");

const store = new Store();

const getBounds = (): Rectangle | undefined => {
	const bounds = store.get("winBounds");
	if (typeof bounds === "object") return bounds as Rectangle;
	return undefined;
};

export const createWindow = (): BrowserWindow => {
	const win = new BrowserWindow({
		...getBounds(),
		webPreferences: {
			preload: path.resolve(root, "src/preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});
	const isDev = process.env.NODE_ENV === "development";

	// The file at buildPath only exists in prod build. See package.json >
	// build > files for more detail.
	const buildPath = `file://${path.resolve(root, "web/index.html")}`;
	win.loadURL(isDev ? "http://localhost:3000" : buildPath);

	win.on("close", () => void store.set("winBounds", win.getBounds()));
	if (isDev) win.webContents.openDevTools();
	win.setMenuBarVisibility(false);

	return win;
};
