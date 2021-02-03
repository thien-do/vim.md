import { Pane } from "@moai/core";
import s from "./explorer.module.css";

export const Explorer = (): JSX.Element => (
	<div className={s.wrapper}>
		<Pane noPadding fullHeight>
			<div className={s.container}>Explorer</div>
		</Pane>
	</div>
);
