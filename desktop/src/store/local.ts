import { ipcRenderer } from "electron";
import fs from "fs";
import { Store } from "./interface";

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

export const localStore: Store = {
	read,
	write,
	list,
	showOpenDialog,
	showSaveDialog,
};
