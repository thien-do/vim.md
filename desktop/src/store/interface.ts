/**
 * IMPORTANT: These 2 files must be identical
 * - desktop/src/store/interface.ts
 * - web/src/store/interface.ts
 */

export interface StoreFile {
	isDirectory: boolean;
	name: string;
}

export interface Store {
	/**
	 * Height of title bar, or null if none (e.g. browser)
	 */
	titleBarHeight: number | null;
	/**
	 * Return content of file at @param path
	 */
	read: (path: string) => Promise<string>;
	/**
	 * Write @param content as file at @param path
	 */
	write: (path: string, content: string) => Promise<void>;
	/**
	 * Remove file at @param path.
	 */
	remove: (path: string) => Promise<void>;
	/**
	 * List files in the directory at @param path, filter only files with
	 * @param extensions. If "all" is provided then return all files.
	 */
	list: (path: string, extensions: "all" | Set<string>) => Promise<StoreFile[]>;
	/**
	 * This depends on whether the host allows us to open an abitrary folder to
	 * work or not:
	 * - If it does not support (e.g. Browser) then this is a
	 *   fixed string that should be used as the "root" folder's name.
	 * - If it does support (e.g. OS) then this is a function that opens the
	 *   native file picker and return the picked path (or "null" if the user
	 *   cancels it).
	 */
	showOpenDialog: (() => Promise<string | null>) | string;
	/**
	 * Open OS's file save dialog and return the chosen path. "null" in the
	 * result means the operation is cancelled.
	 */
	showSaveDialog: () => Promise<string | null>;
}
