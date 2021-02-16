import { toast } from "@moai/core";
import { useEffect } from "react";
import { pathUtils } from "utils/path";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

/**
 * Write editor content into file
 */
export const useEditorWrite = (props: EditorProps): void => {
	const { file, setFile } = props;
	const { write, showSaveDialog } = props.store;

	useEffect(() => {
		CodeMirrorUtils.setCommand("save", async (cm) => {
			const path = file.path === null ? await showSaveDialog() : file.path;
			// "path" is null when pickSaveFile is cancelled
			if (path === null) return;
			await write(path, cm.getValue());
			// This also updates the path in case of new file
			setFile({ path, saved: true });
			toast(toast.types.success, `Saved at ${pathUtils.getLast(path)}`);
		});
	}, [file, write, setFile, showSaveDialog]);
};
