import { Dialog } from "@moai/core";
import { Editor } from "app/editor/editor";
import { Backend } from "backend/interface";
import { useEffect, useState } from "react";
import { SetState } from "utils/state";
import { useFileRead } from "./read";
import { useFileUnload } from "./unload";
import { useFileWrite } from "./write";

export const confirmUnsaved = async (): Promise<boolean> =>
	Dialog.confirm([
		"Discard changes?",
		"You haved unsaved changes that will be lost if continue.",
	]);

export const isGoodToGo = async (file: File): Promise<boolean> => {
	if (file.saved === true) return true;
	return confirmUnsaved();
};

export interface File {
	path: string | null;
	saved: boolean;
}

export interface FileState {
	file: File;
	setFile: SetState<File>;
}

export interface FileProps extends FileState {
	editor: Editor;
	backend: Backend;
}

const PATH_KEY = "vmd-file-path";

const getStorage = (): File => {
	const path = window.localStorage.getItem(PATH_KEY);
	return { path, saved: true };
};

interface Props {
	editor: Editor;
	backend: Backend;
}

export const useFile = ({ editor, backend }: Props): FileState => {
	const [file, setFile] = useState<File>(getStorage);

	// Save to storage
	useEffect(() => {
		const [s, p] = [window.localStorage, file.path];
		p === null ? s.removeItem(PATH_KEY) : s.setItem(PATH_KEY, p);
	}, [file.path]);

	const props = { file, setFile, editor, backend };
	useFileUnload(props);
	useFileRead(props);
	useFileWrite(props);

	return { file, setFile };
};
