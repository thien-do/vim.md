import { useEffect } from "react";
import { Editor, EditorProps } from "./state";

/**
 * Read file content into editor
 */
export const useEditorRead = (props: EditorProps, editor: Editor): void => {
	const { file } = props;
	const { read } = props.store;

	useEffect(() => {
		(async () => {
			if (editor === null) return;
			const content = file === null ? "" : await read(file.path);
			// Avoid set value unnecessarily since it resets CodeMirror's state
			// (e.g. cursor position) and trigger editor's onChange (which we
			// use to set "file.saved" status).
			if (editor.getValue() === content) return;
			editor.setValue(content);
		})();
	}, [file, editor, read]);
};
