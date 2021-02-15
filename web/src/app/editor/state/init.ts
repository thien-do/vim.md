import { RefObject, useEffect, useRef } from "react";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

const ERRORS = {
	EDITOR: "Editor is not initialized",
	CONTAINER: "Container for editor is not defined",
};

/**
 * Init the editor
 */
export const useEditorInit = (
	props: EditorProps
): RefObject<HTMLDivElement> => {
	const container = useRef<HTMLDivElement>(null);
	const { editor, setEditor } = props;

	useEffect(() => {
		if (editor !== null) return;
		if (container.current === null) throw Error(ERRORS.CONTAINER);
		const instance = CodeMirrorUtils.init(container.current);
		setEditor(instance);
	}, [editor, setEditor]);

	return container;
};
