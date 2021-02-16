import { BrowserWindow, Rectangle } from "electron";
import Store from "electron-store";
import path from "path";

// dirname === desktop/dist
const root = path.resolve(__dirname, "../");

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
	win.loadURL(
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: `file://${path.resolve(root, "public/index.html")}`
	);
	win.on("close", () => void store.set("winBounds", win.getBounds()));
	win.webContents.openDevTools();
	win.setMenuBarVisibility(false);
};
