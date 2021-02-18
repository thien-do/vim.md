import { FileState } from "app/file/file";
import { PrefsState } from "app/prefs/state/state";
import { useState } from "react";
import { Store } from "store/store";
import { SetState } from "utils/state";
import { useEditorPrefs } from "./prefs";
import { useEditorRead } from "./read";
import { useEditorWrite } from "./write";

export type Editor = CodeMirror.Editor | null;

export interface EditorState {
	editor: Editor;
	setEditor: SetState<Editor>;
}

export interface EditorProps extends PrefsState, FileState {
	store: Store;
}

export const useEditor = (props: EditorProps): EditorState => {
	const [editor, setEditor] = useState<Editor>(null);
	useEditorRead(props, editor);
	useEditorWrite(props);
	useEditorPrefs(props);
	return { editor, setEditor };
};
