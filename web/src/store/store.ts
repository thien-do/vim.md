export interface StoreFile {
	isDirectory: boolean;
	name: string;
}

export interface Store {
	/** Return content of file at @param path */
	read: (path: string) => Promise<string>;
	/** Write @param content as file at @param path */
	write: (path: string, content: string) => Promise<void>;
	/** List files in the directory at @param path */
	list: (path: string) => Promise<StoreFile[]>;
	/** Open OS's folder picker and return the picked folder path */
	pickFolder: () => Promise<string>;
	/** Open OS's file picker and return the picked file path */
	pickFile: () => Promise<string>;
}
