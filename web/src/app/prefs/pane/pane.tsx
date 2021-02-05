import { Pane, ThemeState } from "@moai/core";
import { PrefsApp } from "../app/app";
import { PrefsEditor } from "../editor/editor";
import { PrefsExplorer } from "../explorer/explorer";
import { PrefsPreview } from "../preview/preview";
import { PrefsState } from "../state/state";
import s from "./pane.module.css";

interface Props extends PrefsState, ThemeState {}

export const PrefsPane = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<Pane noPadding fullHeight>
			<div className={s.container}>
				<div style={{ marginTop: -1 }} />
				<PrefsApp {...props} />
				<PrefsEditor {...props} />
				<PrefsExplorer {...props} />
				<PrefsPreview {...props} />
			</div>
		</Pane>
	</div>
);
