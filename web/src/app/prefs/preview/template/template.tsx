import { DivPx, Radio } from "@moai/core";
import { PrefsState, Template } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./template.module.css";

interface Props extends PrefsState {}

interface Option {
	label: string;
	value: Template;
}

const options: Option[] = [
	{ label: "GitHub", value: "github" },
	{ label: "Serif", value: "serif" },
	// { label: "__Blank", value: "blank" }, // DEBUG
];

const renderOption = (props: Props) => (option: Option, index: number) =>
	(
		<div key={option.value}>
			{index !== 0 && <DivPx size={12} />}
			<Radio
				name="pref-template"
				value={option.value}
				setValue={() => {
					props.setPrefs((prefs) => ({
						...prefs,
						template: option.value,
					}));
				}}
				checked={props.prefs.template === option.value}
				children={option.label}
			/>
		</div>
	);

export const PrefsTemplate = (props: Props): JSX.Element => (
	<div className={s.container}>
		<PaneLabel>
			<div className={s.label}>Template:</div>
		</PaneLabel>
		<div className={s.input}>{options.map(renderOption(props))}</div>
	</div>
);
