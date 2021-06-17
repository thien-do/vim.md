import { BackendStorage, BackendFile } from "./interface";
import { Dialog } from "@moai/core";

const isFile = (key: string): boolean => key.startsWith("docs/root");

const toFile = (key: string): BackendFile => ({
	isDirectory: false,
	name: key.replace("docs/root/", ""),
});

// for localstorage, we would list all found documents, not filter by extension
// at all
const list: BackendStorage["list"] = async (path, _extensions) => {
	// This is just a sanity check to improve our code
	if (path !== "root")
		throw Error('Path must always be "root" in case of local storage');
	const keys = Object.keys(window.localStorage);
	const files = keys.filter(isFile).map(toFile);
	return files;
};

const read: BackendStorage["read"] = async (path) => {
	const key = `docs/${path}`;
	const content = window.localStorage.getItem(key);
	if (content === null) throw Error("File not found");
	return content;
};

const write: BackendStorage["write"] = async (path, content) => {
	window.localStorage.setItem(`docs/${path}`, content);
};

const showSaveDialog: BackendStorage["showSaveDialog"] = async () => {
	const name = await Dialog.prompt(
		<>
			<Dialog.Title>ahihi</Dialog.Title>
			"Enter a name to save"
		</>
	);
	const path = `root/${name}`;
	return path;
};

export const localBackendStorage: BackendStorage = {
	list,
	read,
	write,
	showOpenDialog: "root",
	showSaveDialog,
};
