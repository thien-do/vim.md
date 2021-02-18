import { CodeMirrorUtils } from "app/editor/codemirror/codemirror";
import { useEffect } from "react";
import { PrefsState } from "./state";

/**
 * Bind pref changes to editor's commands
 */
export const usePrefsInEditor = (setPrefs: PrefsState["setPrefs"]): void => {
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
