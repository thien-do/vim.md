import { Switcher, SwitcherOption, Theme, ThemeState } from "@moai/core";
import { Moon, Sun } from "@moai/icon/hrs";
import { PaneLabel } from "components/pane/label/label";
import s from "./theme.module.css";

interface Props extends ThemeState {}

const getThemeOptions = (): SwitcherOption<Theme>[] => [
	{ value: "light", label: "Light", icon: Sun },
	{ value: "system", label: "System" },
	{ value: "dark", label: "Dark", icon: Moon },
];

export const PrefsTheme = (props: Props): JSX.Element => (
	<fieldset>
		<div className={s.container}>
			<PaneLabel>Theme:</PaneLabel>
			<div className={s.input}>
				<Switcher<Theme>
					value={props.theme}
					setValue={props.setTheme}
					fill={true}
					options={getThemeOptions()}
				/>
			</div>
		</div>
	</fieldset>
);
