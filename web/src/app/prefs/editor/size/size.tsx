import { DivPx, Select, SelectOption } from "@moai/core";
import { FontSize, PrefsState } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./size.module.css";

interface Props extends PrefsState {}

const indexToSize: FontSize[] = [
    "4xs", "3xs", "2xs", "xs", "s", "m",
    "l", "xl", "2xl", "3xl", "4xl", "5xl",
    "6xl", "7xl", "8xl", "9xl", "10xl",
]; // prettier-ignore
const sizeToIndex = {} as Record<FontSize, number>;
indexToSize.forEach((size, index) => void (sizeToIndex[size] = index));

// const recommendations: number[] = [sizeToIndex["xl"]];

const options: SelectOption<FontSize>[] = indexToSize.map((size) => {
	return { id: size, value: size, label: size.toUpperCase() };
});

export const PrefsFontSize = (props: Props): JSX.Element => (
	<div className={s.container}>
		<PaneLabel>Text size:</PaneLabel>
		<div className={s.value}>
			<Select
				fill
				value={props.prefs.fontSize}
				setValue={(fontSize) => {
					props.setPrefs((prefs) => ({ ...prefs, fontSize }));
				}}
				options={options}
			/>
		</div>
		<DivPx size={16} />
		<div className={s.input}>
			{/* <RangeInput
				value={sizeToIndex[prefs.fontSize]}
				setValue={(index) => {
					const fontSize = indexToSize[index];
					setPrefs((prev) => ({ ...prev, fontSize }));
				}}
				min={0}
				max={indexToSize.length - 1}
				step={1}
				list={{ id: "pref-font-size", numbers: recommendations }}
			/> */}
		</div>
	</div>
);
