import s from "./app.module.css";
import { Editor } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { ToolbarToggle } from "./toolbar/toggle/toggle";
import { Toolbar } from "./toolbar/toolbar";

export const App = (): JSX.Element => {
	const { prefs, setPrefs } = usePrefs();
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
						<Explorer />
					</div>
				)}
				<div className={s.editor}>
					<Editor />
				</div>
				{prefs.prefsVisible && (
					<div className={s.prefs}>
						<PrefsPane prefs={prefs} setPrefs={setPrefs} />
					</div>
				)}
			</div>
		</div>
	);
};
