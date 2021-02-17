import { isGoodToGo } from "app/file/file";
import { useEffect } from "react";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

export const useEditorCommands = (props: EditorProps): void => {
	const { setFile, file } = props;
	useEffect(() => {
		CodeMirrorUtils.setCommand("quit", async () => {
			if ((await isGoodToGo(file)) === false) return;
			setFile({ path: null, saved: true });
		});
	}, [setFile, file]);
};
