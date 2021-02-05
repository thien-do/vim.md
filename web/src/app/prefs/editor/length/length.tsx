import { DivPx, Select, SelectOption } from "@moai/core";
import { LineLength, PrefsState } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./length.module.css";

interface Props extends PrefsState {}

const options: SelectOption<LineLength>[] = [
	{ id: "64", value: 64, label: "64" },
	{ id: "72", value: 72, label: "72" },
	{ id: "80", value: 80, label: "80" },
];

export const PrefsLineLength = (props: Props): JSX.Element => (
	<div className={s.container}>
		<PaneLabel />
		<Select
			value={props.prefs.lineLength}
			setValue={(lineLength) => {
				props.setPrefs((prefs) => ({ ...prefs, lineLength }));
			}}
			options={options}
		/>
		<DivPx size={8} />
		<div className={s.label}>characters per line</div>
	</div>
);
