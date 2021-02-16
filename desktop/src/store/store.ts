import fs from "fs";
import { ipcRenderer } from "electron";

interface StoreFile {
	isDirectory: boolean;
	name: string;
}

export interface Store {
	/**
	 * Return content of file at @param path
	 */
	read: (path: string) => Promise<string>;
	/**
	 * Write @param content as file at @param path
	 */
	write: (path: string, content: string) => Promise<void>;
	/**
	 * List files in the directory at @param path
	 */
	list: (path: string) => Promise<StoreFile[]>;
	/**
	 * Open OS's folder picker and return the picked folder path. "null" means
	 * the operation is cancelled.
	 */
	showOpenDialog: () => Promise<string | null>;
	/**
	 * Open OS's file save dialog and return the chosen path. "null" means the
	 * operation is cancelled.
	 */
	showSaveDialog: () => Promise<string | null>;
}

const read: Store["read"] = async (path) => {
	let content = fs.readFileSync(path, "utf8");
	return content;
};

const write: Store["write"] = async (path, content) => {
	fs.writeFileSync(path, content, "utf8");
};

const list: Store["list"] = async (path) => {
	let items = fs.readdirSync(path).map(function (value) {
		let stat = fs.statSync(path + "/" + value);
		return {
			isDirectory: stat.isDirectory(),
			name: value,
		};
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

export const store: Store = {
	read,
	write,
	list,
	showOpenDialog,
	showSaveDialog,
};
