import { Store } from "@vimdotmd/editor";
import fs from "fs";

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
