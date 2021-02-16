import { useEffect } from "react";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

export const useEditorCommands = (props: EditorProps): void => {
	const { setFile } = props;
	useEffect(() => {
		CodeMirrorUtils.setCommand("quit", () => {
			setFile({ path: null, saved: true });
		});
	}, [setFile]);
};
