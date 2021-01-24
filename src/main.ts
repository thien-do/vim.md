import { app, BrowserWindow, ipcMain, Rectangle } from "electron";
import Store from "electron-store";
import path from "path";

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
			preload: path.resolve(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});
	win.loadFile(path.resolve(__dirname, "../static/index.html"));
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
