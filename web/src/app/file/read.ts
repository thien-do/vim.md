import { useEffect } from "react";
import { FileProps } from "./file";

/**
 * Read file content into editor
 */
export const useFileRead = (props: FileProps): void => {
	const { file, setFile, editor } = props;
	const { read } = props.store;

	const path = file?.path ?? null;
	useEffect(() => {
		if (editor === null) return;
		const destructor = { fn: () => {} };
		(async () => {
			const content = path === null ? "" : await read(path);
			editor.setValue(content);

			// Only add "change" listener after setting the value to avoid the
			// listener being triggered due to our own set.
			const setSaved = () => {
				setFile((file) => {
					if (file === null || file.saved === false) return file;
					return { ...file, saved: false };
				});
			};
			editor.on("change", setSaved);
			destructor.fn = () => editor.off("change", setSaved);
		})();
		return () => destructor.fn();
	}, [path, setFile, editor, read]);
};
