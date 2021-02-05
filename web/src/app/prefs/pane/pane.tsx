import { Pane } from "@moai/core";
import { PrefsExplorer } from "../explorer/explorer";
import { PrefsPreview } from "../preview/preview";
import { PrefsState } from "../state/state";
import s from "./pane.module.css";

interface Props extends PrefsState {}

export const PrefsPane = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<Pane noPadding fullHeight>
			<div className={s.container}>
				<div style={{ marginTop: -1 }} />
				<PrefsExplorer {...props} />
				<PrefsPreview {...props} />
			</div>
		</Pane>
	</div>
);
