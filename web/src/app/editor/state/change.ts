import { Editor, EditorProps } from "app/editor/state/state";
import { useEffect } from "react";

/**
 * Update "saved" status of current file
 */
export const useEditorChange = (props: EditorProps, editor: Editor): void => {
	const { file, setFile } = props;
	useEffect(() => {
		if (editor === null) return;
		if (file === null) return;
		if (file.saved === false) return;
		const setSaved = () => void setFile({ ...file, saved: false });
		editor.on("change", setSaved);
		return () => void editor.off("change", setSaved);
	}, [editor, file, setFile]);
};
