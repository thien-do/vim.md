import s from "./app.module.css";
import { Editor } from "./editor/editor";
import { Explorer } from "./explorer/explorer";
import { PrefsPane } from "./prefs/pane/pane";
import { usePrefs } from "./prefs/state/state";
import { ToolbarToggle } from "./toolbar/toggle/toggle";
import { Toolbar } from "./toolbar/toolbar";

export const App = (): JSX.Element => {
	const { prefs, setPrefs } = usePrefs();
	return (
		<div className={s.container}>
			<div className={s.toolbarToggle}>
				<ToolbarToggle />
			</div>
			<div className={s.toolbar}>
				<Toolbar />
			</div>
			<div className={s.explorer}>
				<Explorer />
			</div>
			<div className={s.editor}>
				<Editor />
			</div>
			<div className={s.prefs}>
				<PrefsPane />
			</div>
		</div>
	);
};
