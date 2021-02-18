import { dialogConfirm } from "@moai/core";
import { useEffect, useState } from "react";
import { pathUtils } from "utils/path";
import { SetState } from "utils/state";

const confirmUnsaved = async (): Promise<boolean> =>
	dialogConfirm([
		"Discard changes?",
		"You haved unsaved changes that will be lost if continue.",
	]);

export const isGoodToGo = async (file: File): Promise<boolean> => {
	if (file.saved === true) return true;
	return confirmUnsaved();
};

interface File {
	path: string | null;
	saved: boolean;
}

export interface FileState {
	file: File;
	setFile: SetState<File>;
}

const PATH_KEY = "vmd-file-path";

const getStorage = (): File => {
	const path = window.localStorage.getItem(PATH_KEY);
	return { path, saved: true };
};

export const useFile = (): FileState => {
	const [file, setFile] = useState<File>(getStorage);

	// Save to storage
	useEffect(() => {
		const [s, p] = [window.localStorage, file.path];
		p === null ? s.removeItem(PATH_KEY) : s.setItem(PATH_KEY, p);
	}, [file.path]);

	// Update window title
	useEffect(() => {
		const title = file.path ? pathUtils.getLast(file.path) : "Untitled";
		const unsaved = file === null || file.saved === false;
		const prefix = unsaved ? "• " : "";
		window.document.title = `${prefix}${title} - vim.md`;
	}, [file]);

	// Avoid closing window when having unsaved changes
	useEffect(() => {
		if (file.saved) return;
		const forced = { current: false };
		const handler = (event: BeforeUnloadEvent): void | string => {
			if (forced.current) return;
			(async () => {
				if ((await confirmUnsaved()) === false) return;
				forced.current = true;
				(window as any).backend.winClose();
			})();
			event.preventDefault();
			event.returnValue = "You have unsaved changes";
			return "You have unsaved changes";
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [file.saved]);

	return { file, setFile };
};
