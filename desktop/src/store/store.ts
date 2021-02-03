import fs from "fs";

export interface Store {
	/** Return content of file at @param path */
	read: (path: string) => Promise<string>;
	/** Write @param content as file at @param path */
	write: (path: string, content: string) => Promise<void>;
	/** List files in the directory at @param path */
	list: (path: string) => Promise<string[]>;
	/** Open OS's folder picker and return the picked folder path */
	openFolder: () => Promise<string>;
}

const read: Store["read"] = async (path) => {
	return `Content from ${path}`;
};

const write: Store["write"] = async (path, content) => {
	console.log(`Save ${content.length} chars at ${path}`);
};

const list: Store["list"] = async (path) => {
	console.log("Test fs", fs.readdirSync("/"));
	console.log(`List files at ${path}`);
	return ["Foo.md", "Bar.md", "Baz.md"];
};

const openFolder: Store["openFolder"] = async () => {
	return "/home/fake/path";
};

export const store: Store = { read, write, list, openFolder };
