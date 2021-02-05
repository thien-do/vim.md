import { Pane } from "@moai/core";
import s from "./prefs.module.css";

export const PrefsPane = (): JSX.Element => (
	<div className={s.wrapper}>
		<Pane noPadding fullHeight>
			<div className={s.container}>Prefs</div>
		</Pane>
	</div>
);
