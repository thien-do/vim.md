import { useEffect } from "react";
import { EditorProps } from "./state";

/**
 * Read file content into editor
 */
export const useEditorRead = (props: EditorProps): void => {
	const { filePath, editor } = props;
	const { read } = props.store;

	useEffect(() => {
		(async () => {
			if (editor === null) return;
			const content = filePath === null ? "" : await read(filePath);
			editor.setValue(content);
		})();
	}, [filePath, editor, read]);
};
