import { ipcRenderer } from "electron";
import fs from "fs";
import nodePath from "path";
import { Store, StoreFile } from "./interface";

const read: Store["read"] = async (path) => {
	let content = fs.readFileSync(path, "utf8");
	return content;
};

const write: Store["write"] = async (path, content) => {
	fs.writeFileSync(path, content, "utf8");
};

const list: Store["list"] = async (path, extensions) => {
	let files: string[] = fs.readdirSync(path);
	// Filter by extensions
	if (extensions !== undefined) {
		files = files.filter((name): boolean => {
			return extensions.has(nodePath.extname(name));
		});
	}
	// Convert to our format
	const items: StoreFile[] = fs.readdirSync(path).map((name) => {
		const stat = fs.statSync(path + "/" + name);
		const isDirectory = stat.isDirectory();
		return { isDirectory, name };
	});
	return items;
};

const showOpenDialog: Store["showOpenDialog"] = async () => {
	const { canceled, filePaths } = await ipcRenderer.invoke("showOpenDialog", {
		properties: ["openDirectory", "createDirectory"],
	});
	if (canceled) return null;
	return filePaths[0] ?? null;
};

const showSaveDialog: Store["showSaveDialog"] = async () => {
	const { canceled, filePath } = await ipcRenderer.invoke("showSaveDialog", {
		properties: [
			"createDirectory",
			"showOverwriteConfirmation",
			"showHiddenFiles",
		],
	});
	if (canceled) return null;
	return filePath ?? null;
};

export const localStore: Store = {
	titleBarHeight: 28,
	read,
	write,
	list,
	showOpenDialog,
	showSaveDialog,
};
