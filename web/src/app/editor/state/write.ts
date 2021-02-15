import { dialogPrompt, toast } from "@moai/core";
import { useEffect } from "react";
import { pathUtils } from "utils/path";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

/**
 * Write editor content into file
 */
export const useEditorWrite = (props: EditorProps): void => {
	const { file, setFile } = props;
	const { write } = props.store;

	useEffect(() => {
		const getPath = async (): Promise<string> => {
			if (file !== null) return file.path;
			// New file -> Ask for path
			// @TODO: Use store.pickFile
			const newPath = await dialogPrompt("Path?");
			if (typeof newPath === "string") return newPath;
			throw Error("No file path to save");
		};

		CodeMirrorUtils.setCommand("save", async (cm) => {
			const path = await getPath();
			await write(path, cm.getValue());
			// This also updates the path in case of new file
			setFile({ path, saved: true });
			toast(toast.types.success, `Saved at ${pathUtils.getLast(path)}`);
		});
	}, [file, write, setFile]);
};
