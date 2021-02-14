import { useTheme } from "@moai/core";
import { useState } from "react";
import { Store } from "store/store";
import { useStorageState } from "utils/state";
import s from "./app.module.css";
import { Editor, EditorPane } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
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
	return (
		<div className={[s.container, toolbarCls].join(" ")}>
			<div className={s.toolbarToggle}>
				<ToolbarToggle prefs={prefs} setPrefs={setPrefs} />
			</div>
			{prefs.toolbarVisible && (
				<div className={s.toolbar}>
					<Toolbar prefs={prefs} setPrefs={setPrefs} />
				</div>
			)}
			<div className={s.body}>
				{prefs.explorerVisible && (
					<div className={s.explorer}>
						<Explorer
							filePath={filePath}
							setFilePath={setFilePath}
							store={props.store}
						/>
					</div>
				)}
				<div className={s.editor}>
					<EditorPane
						store={props.store}
						filePath={filePath}
						prefs={prefs}
						setPrefs={setPrefs}
						editor={editor}
						setEditor={setEditor}
					/>
				</div>
				{prefs.prefsVisible && (
					<div className={s.prefs}>
						<PrefsPane
							prefs={prefs}
							setPrefs={setPrefs}
							theme={theme}
							setTheme={setTheme}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
