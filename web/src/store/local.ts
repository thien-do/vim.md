import { Store, StoreFile } from "./interface";
import { Dialog } from "@moai/core";

const isFile = (key: string): boolean => key.startsWith("docs/root");

const toFile = (key: string): StoreFile => ({
	isDirectory: false,
	name: key.replace("docs/root/", ""),
});

const list: Store["list"] = async () => {
	const keys = Object.keys(window.localStorage);
	const files = keys.filter(isFile).map(toFile);
	return files;
};

const read: Store["read"] = async (path) => {
	const key = `docs/${path}`;
	const content = window.localStorage.getItem(key);
	if (content === null) throw Error("File not found");
	return content;
};

const write: Store["write"] = async (path, content) => {
	window.localStorage.setItem(`docs/${path}`, content);
};

const showSaveDialog: Store["showSaveDialog"] = async () => {
	const name = await Dialog.prompt("Enter a name to save");
	const path = `root/${name}`
	return path;
};

export const localStore: Store = {
	titleBarHeight: null,
	list,
	read,
	write,
	showOpenDialog: "root",
	showSaveDialog,
};
