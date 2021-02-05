import { DivPx, MutedSpan, Radio } from "@moai/core";
import { FontFamily, PrefsState } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./family.module.css";

interface Props extends PrefsState {}

interface Option {
	title: string;
	description: string;
	value: FontFamily;
}

const renderLabel = (option: Option) => (
	<span>
		<span>{option.title}</span>
		<MutedSpan> – {option.description}</MutedSpan>
	</span>
);

const options: Option[] = [
	{ title: "Mono", description: "A classic choice", value: "mono" },
	{ title: "Duo", description: "More room for W’s and M’s", value: "duo" },
	{ title: "Quattro", description: "Propotional lovers", value: "quattro" },
];

const renderOption = (props: Props) => (option: Option, index: number) => (
	<div key={option.value}>
		{index !== 0 && <DivPx size={12} />}
		<Radio
			name="pref-font-family"
			value={option.value}
			setValue={() => {
				props.setPrefs((prefs) => ({ ...prefs, fontFamily: option.value }));
			}}
			checked={props.prefs.fontFamily === option.value}
			children={renderLabel(option)}
		/>
	</div>
);

export const PrefsFontFamily = (props: Props): JSX.Element => (
	<div className={s.container}>
		<PaneLabel>
			<div className={s.label}>Typeface:</div>
		</PaneLabel>
		<div className={s.input}>{options.map(renderOption(props))}</div>
	</div>
);
