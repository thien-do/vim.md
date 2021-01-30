import { app, BrowserWindow, ipcMain, Rectangle } from "electron";
import Store from "electron-store";
import path from "path";

// dirname === desktop(root)/dist/server/server.js
const root = path.resolve(__dirname, "../../");

const store = new Store();

const getBounds = (): Rectangle | undefined => {
	const bounds = store.get("winBounds");
	if (typeof bounds === "object") return bounds as Rectangle;
	return undefined;
};

const createWindow = () => {
	const win = new BrowserWindow({
		...getBounds(),
		webPreferences: {
			preload: path.resolve(root, "dist/server/preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});
	win.loadFile(path.resolve(root, "static/index.html"));
	win.on("close", () => {
		store.set("winBounds", win.getBounds());
	});
	win.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.handle(
	"get-42",
	async (): Promise<number> => {
		return 42;
	}
);
