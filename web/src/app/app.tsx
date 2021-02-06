import { useTheme } from "@moai/core";
import { Store } from "store/store";
import s from "./app.module.css";
import { Editor } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { ToolbarToggle } from "./toolbar/toggle/toggle";
import { Toolbar } from "./toolbar/toolbar";

interface Props {
	store: Store;
}

export const App = (props: Props): JSX.Element => {
	const { prefs, setPrefs } = usePrefs();
	const { theme, setTheme } = useTheme();
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
						<Explorer store={props.store} />
					</div>
				)}
				<div className={s.editor}>
					<Editor />
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
