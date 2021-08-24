import { Switcher, SwitcherOption } from "@moai/core";
import { PrefsState, Theme } from "app/prefs/state/state";
import { PaneLabel } from "components/pane/label/label";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import s from "./theme.module.css";

interface Props extends PrefsState {}

const getThemeOptions = (): SwitcherOption<Theme>[] => [
	{ value: "light", label: "Light", icon: RiSunLine },
	{ value: "system", label: "System" },
	{ value: "dark", label: "Dark", icon: RiMoonLine },
];

export const PrefsTheme = (props: Props): JSX.Element => (
	<fieldset>
		<div className={s.container}>
			<PaneLabel>Theme:</PaneLabel>
			<div className={s.input}>
				<Switcher<Theme>
					value={props.prefs.theme}
					setValue={(theme) =>
						props.setPrefs((prefs) => ({ ...prefs, theme }))
					}
					fill
					options={getThemeOptions()}
				/>
			</div>
		</div>
	</fieldset>
);
