import { ipcRenderer } from "electron";
import fs from "fs/promises";
import nodePath from "path";
import { BackendFile, BackendStorage } from "./interface";

const read: BackendStorage["read"] = async (path) => {
	let content = await fs.readFile(path, "utf8");
	return content;
};

const write: BackendStorage["write"] = async (path, content) => {
	await fs.writeFile(path, content, "utf8");
};

const remove: BackendStorage["remove"] = async (path) => {
	await fs.unlink(path);
};

const list: BackendStorage["list"] = async (path, extensions) => {
	const names = await fs.readdir(path);
	// Convert to our format
	const files: BackendFile[] = await Promise.all(
		names.map(async (name) => {
			const stat = await fs.stat(path + "/" + name);
			const isDirectory = stat.isDirectory();
			return { isDirectory, name };
		})
	);
	// Filter by extensions (after converting so we know if it's a folder)
	if (extensions === "all") return files;
	const filtered = files.filter((file): boolean => {
		if (file.isDirectory) return true;
		const extension = nodePath.extname(file.name).replace(".", "");
		return extensions.has(extension);
	});
	return filtered;
};

const showOpenDialog: BackendStorage["showOpenDialog"] = async () => {
	const { canceled, filePaths } = await ipcRenderer.invoke("showOpenDialog", {
		properties: ["openDirectory", "createDirectory"],
	});
	if (canceled) return null;
	return filePaths[0] ?? null;
};

const showSaveDialog: BackendStorage["showSaveDialog"] = async () => {
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

export const localBackendStorage: BackendStorage = {
	read,
	write,
	remove,
	list,
	showOpenDialog,
	showSaveDialog,
};
