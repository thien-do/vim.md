import { app, BrowserWindow, ipcMain } from "electron";
import { createWindow } from "./window/window";

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("get-42", async () => 42);
