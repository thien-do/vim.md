import { toast } from "@moai/core";
import { CodeMirrorUtils } from "app/editor/codemirror/codemirror";
import { FileProps, isGoodToGo } from "app/file/file";
import { useEffect } from "react";
import { pathUtils } from "utils/path";

/**
 * Write editor content into file
 */
export const useFileWrite = (props: FileProps): void => {
	const { file, setFile } = props;
	const { write, showSaveDialog } = props.store;

	useEffect(() => {
		const save = async (cm: CodeMirror.Editor) => {
			const path = file.path === null ? await showSaveDialog() : file.path;
			// "path" is null when pickSaveFile is cancelled
			if (path === null) return;
			await write(path, cm.getValue());
			// This also updates the path in case of new file
			setFile({ path, saved: true });
			toast(toast.types.success, `Saved at ${pathUtils.getLast(path)}`);
		};

		const quit = () => void setFile({ path: null, saved: true });

		CodeMirrorUtils.setCommand("save", save);
		CodeMirrorUtils.setCommand("quit", async () => {
			if (await isGoodToGo(file)) quit();
		});
		CodeMirrorUtils.setCommand("saveAndQuit", async (cm) => {
			await save(cm);
			quit();
		});
	}, [file, write, setFile, showSaveDialog]);
};
