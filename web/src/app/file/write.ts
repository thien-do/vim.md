import { toast } from "@moai/core";
import { CodeMirrorUtils } from "app/editor/codemirror/codemirror";
import { FileProps, isGoodToGo } from "app/file/file";
import { useEffect } from "react";

/**
 * Write editor content into file
 */
export const useFileWrite = (props: FileProps): void => {
	const { file, setFile } = props;
	const { write, showSaveDialog } = props.backend.storage;
	const { parse } = props.backend.path;

	useEffect(() => {
		const save = async (cm: CodeMirror.Editor) => {
			const path =
				file.path === null ? await showSaveDialog() : file.path;
			// "path" is null when pickSaveFile is cancelled
			if (path === null) return;
			await write(path, cm.getValue());
			// This also updates the path in case of new file
			setFile({ path, saved: true });
			const name = parse(path).base;
			toast(toast.types.success, `Saved at ${name}`);
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
	}, [file, write, setFile, parse, showSaveDialog]);
};
