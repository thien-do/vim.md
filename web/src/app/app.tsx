import { Editor } from "../editor/editor";
import { Explorer } from "../explorer/explorer";
import { Prefs } from "../prefs/prefs";
import { Toolbar } from "../toolbar/toolbar";
import s from "./app.module.css";

export const App = (): JSX.Element => (
	<div className={s.container}>
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
			<Prefs />
		</div>
	</div>
);
