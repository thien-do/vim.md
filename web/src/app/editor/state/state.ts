import { FilePathState } from "app/app";
import { PrefsState } from "app/prefs/state/state";
import { RefObject } from "react";
import { Store } from "store/store";
import { SetState } from "utils/state";
import { useEditorInit } from "./init";
import { useEditorRead } from "./read";
import { useEditorWrite } from "./write";

export type Editor = CodeMirror.Editor | null;

export interface EditorState {
	editor: Editor;
	setEditor: SetState<Editor>;
}

export interface EditorProps extends PrefsState, EditorState, FilePathState {
	store: Store;
}

export const useEditor = (props: EditorProps): RefObject<HTMLDivElement> => {
	const container = useEditorInit(props);
	useEditorRead(props);
	useEditorWrite(props);
	return container;
};
