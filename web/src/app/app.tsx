import { scrollbar } from "@moai/core";
import { useState } from "react";
import { Store } from "store/store";
import s from "./app.module.css";
import { EditorPane, Editor } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { useFile } from "./file/file";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { Preview } from "./preview/preview";
import { ToolbarToggle } from "./toolbar/toggle/toggle";
import { Toolbar } from "./toolbar/toolbar";

interface Props {
	store: Store;
}

export const App = (props: Props): JSX.Element => {
	const { store } = props;

	// State
	const [editor, setEditor] = useState<Editor>(null);
	const { prefs, setPrefs } = usePrefs();
	const { file, setFile } = useFile({ store, editor });

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
				file={file}
				setFile={setFile}
				store={props.store}
				prefs={prefs}
			/>
		</div>
	);

	// Always render Editor to keep CodeMirror's internal state
	const editorPane = (
		<div
			className={s.editor}
			style={{ display: prefs.layout === "preview" ? "none" : "block" }}
		>
			<EditorPane prefs={prefs} editor={editor} setEditor={setEditor} />
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
			/>
		</div>
	);

	return (
		<div className={[scrollbar.custom, s.container, toolbarCls].join(" ")}>
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
