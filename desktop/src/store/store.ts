import fs from "fs";

interface File {
	isDirectory: boolean;
	name: string;
}

export interface Store {
	/** Return content of file at @param path */
	read: (path: string) => Promise<string>;
	/** Write @param content as file at @param path */
	write: (path: string, content: string) => Promise<void>;
	/** List files in the directory at @param path */
	list: (path: string) => Promise<File[]>;
	/** Open OS's folder picker and return the picked folder path */
	openFolder: () => Promise<string>;
}

const read: Store["read"] = async (path) => {
	let content = fs.readFileSync(path, "utf8")
	return content;
};

const write: Store["write"] = async (path, content) => {
	fs.writeFileSync(path, content, "utf8")
};

const list: Store["list"] = async (path) => {
	let items = fs.readdirSync(path).map(function (value) {
		let stat = fs.statSync(path + "/" + value)
		return {
			isDirectory: stat.isDirectory(),
			name: value
		}
	})
	return items
};

const openFolder: Store["openFolder"] = async () => {
	return `/home/fake/path-${Math.random()}`;
};

export const store: Store = { read, write, list, openFolder };
