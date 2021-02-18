import { useEffect } from "react";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import { EditorProps } from "./state";

export const useEditorPrefs = (props: EditorProps): void => {
	const { setPrefs } = props;
	useEffect(() => {
		CodeMirrorUtils.setCommand("toggleExplorer", () => {
			setPrefs((p) => ({ ...p, explorerVisible: !p.explorerVisible }));
		});
		CodeMirrorUtils.setCommand("toggleToolbar", () => {
			setPrefs((p) => ({ ...p, toolbarVisible: !p.toolbarVisible }));
		});
		CodeMirrorUtils.setCommand("togglePrefs", () => {
			setPrefs((p) => ({ ...p, prefsVisible: !p.prefsVisible }));
		});
		CodeMirrorUtils.setCommand("togglePreview", () => {
			setPrefs((p) => ({
				...p,
				layout: p.layout === "preview" ? "editor" : "preview",
			}));
		});
		CodeMirrorUtils.setCommand("toggleSplit", () => {
			setPrefs((p) => ({
				...p,
				layout: p.layout === "split" ? "editor" : "split",
			}));
		});
	}, [setPrefs]);
};
