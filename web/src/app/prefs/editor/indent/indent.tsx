import { Switcher, SwitcherOption } from "@moai/core";
import { PrefsState } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import s from "./indent.module.css";

interface Props extends PrefsState {}

const options: SwitcherOption<boolean>[] = [
	{ value: true, label: "Tab" },
	{ value: false, label: "Space" },
];

export const PrefsIndent = (props: Props): JSX.Element => (
	<fieldset>
		<div className={s.container}>
			<PaneLabel>Indentation:</PaneLabel>
			<div className={s.input}>
				<Switcher<boolean>
					fill
					value={props.prefs.useTab}
					setValue={(useTab) => {
						props.setPrefs((prefs) => ({ ...prefs, useTab }));
					}}
					options={options}
				/>
			</div>
			<div className={s.space} />
		</div>
	</fieldset>
);
