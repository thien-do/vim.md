import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { createWindow } from "./window";

const win: { current: BrowserWindow | null } = { current: null };

app.whenReady().then(() => {
	win.current = createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("showOpenDialog", async (_event, options) => {
	if (win.current === null) throw Error("Window is not defined");
	return await dialog.showOpenDialog(win.current, options);
});

ipcMain.handle("showSaveDialog", async (_event, options) => {
	if (win.current === null) throw Error("Window is not defined");
	return await dialog.showSaveDialog(win.current, options);
});

ipcMain.handle("winClose", async () => {
	if (win.current === null) throw Error("Window is not defined");
	win.current.close();
});
