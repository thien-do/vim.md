import { useEffect } from "react";
import { pathUtils } from "utils/path";
import { SetState, useStorageState } from "utils/state";

interface File {
	path: string;
	saved: boolean;
}

export interface FileState {
	file: File | null;
	setFile: SetState<File | null>;
}

const STORAGE_KEY = "vmd-file-path";

export const useFile = (): FileState => {
	const [file, setFile] = useStorageState<File>(STORAGE_KEY);

	// Update window title
	useEffect(() => {
		const title = file ? pathUtils.getLast(file.path) : "Untitled";
		const unsaved = file === null || file.saved === false;
		const prefix = unsaved ? "• " : ""
		window.document.title = `${prefix}${title} - vim.md`;
	}, [file]);

	return { file, setFile };
};
