import { scrollbar } from "@moai/core";
import { useBackend } from "backend/backend";
import { useState } from "react";
import s from "./app.module.css";
import { Editor, EditorPane } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { useFile } from "./file/file";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { Preview } from "./preview/preview";
import { Title } from "./title/title";
import { Toolbar } from "./toolbar/toolbar";

export const App = (): JSX.Element => {
	// State
	const backend = useBackend();
	const [editor, setEditor] = useState<Editor>(null);
	const { prefs, setPrefs } = usePrefs();
	const { file, setFile } = useFile({ backend, editor });

	// Render
	const toolbarCls = prefs.toolbarVisible ? "" : s.woToolbar;
	const toolbar = prefs.toolbarVisible && (
		<div className={s.toolbar}>
			<Toolbar ui={backend.ui} prefs={prefs} setPrefs={setPrefs} />
		</div>
	);

	const explorer = prefs.explorerVisible && (
		<div className={s.explorer}>
			<Explorer
				file={file}
				setFile={setFile}
				backend={backend}
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

	/* Avoid render Preview if not necessary to improve performance */
	const preview = prefs.layout !== "editor" && (
		<div className={s.preview}>
			<Preview editor={editor} prefs={prefs} />
		</div>
	);

	const prefsPane = prefs.prefsVisible && (
		<div className={s.prefs}>
			<PrefsPane prefs={prefs} setPrefs={setPrefs} />
		</div>
	);

	const title = (
		<div className={s.title}>
			<Title
				backend={backend}
				prefs={prefs}
				setPrefs={setPrefs}
				file={file}
			/>
		</div>
	);

	return (
		<div className={[scrollbar.custom, s.container, toolbarCls].join(" ")}>
			{title}
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
