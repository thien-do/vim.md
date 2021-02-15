import { useTheme } from "@moai/core";
import { useState } from "react";
import { Store } from "store/store";
import { useStorageState } from "utils/state";
import s from "./app.module.css";
import { Editor, EditorPane } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { Preview } from "./preview/preview";
import { ToolbarToggle } from "./toolbar/toggle/toggle";
import { Toolbar } from "./toolbar/toolbar";

interface Props {
	store: Store;
}

const FILE_PATH_KEY = "vmd-file-path";

export const App = (props: Props): JSX.Element => {
	// State
	const { prefs, setPrefs } = usePrefs();
	const { theme, setTheme } = useTheme();
	const [filePath, setFilePath] = useStorageState<string>(FILE_PATH_KEY);
	const [editor, setEditor] = useState<Editor>(null);

	// Render
	const toolbarCls = prefs.toolbarVisible ? "" : s.woToolbar;
	const toolbar = (
		<>
			<div className={s.toolbarToggle}>
				<ToolbarToggle prefs={prefs} setPrefs={setPrefs} />
			</div>
			{prefs.toolbarVisible && (
				<div className={s.toolbar}>
					<Toolbar prefs={prefs} setPrefs={setPrefs} />
				</div>
			)}
		</>
	);

	const explorer = prefs.explorerVisible && (
		<div className={s.explorer}>
			<Explorer
				filePath={filePath}
				setFilePath={setFilePath}
				store={props.store}
			/>
		</div>
	);

	// Always render Editor to keep CodeMirror's internal state
	const editorPane = (
		<div
			className={s.editor}
			style={{ display: prefs.layout === "preview" ? "none" : "block" }}
		>
			<EditorPane
				store={props.store}
				filePath={filePath}
				prefs={prefs}
				setPrefs={setPrefs}
				editor={editor}
				setEditor={setEditor}
			/>
		</div>
	);

	/* avoid render Preview if not necessary to improve performance */
	const preview = prefs.layout !== "editor" && (
		<div className={s.preview}>
			<Preview editor={editor} prefs={prefs} />
		</div>
	);

	const prefsPane = prefs.prefsVisible && (
		<div className={s.prefs}>
			<PrefsPane
				prefs={prefs}
				setPrefs={setPrefs}
				theme={theme}
				setTheme={setTheme}
			/>
		</div>
	);

	return (
		<div className={[s.container, toolbarCls].join(" ")}>
			{toolbar}
			<div className={s.body}>
				{explorer}
				{editorPane}
				{preview}
				{prefsPane}
			</div>
		</div>
	);
};
