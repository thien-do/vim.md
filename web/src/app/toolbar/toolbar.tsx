import { Button, DivPx, Pane, Switcher } from "@moai/core";
import { Adjustments, Collection, QuestionMarkCircle } from "@moai/icon/hrs";
import { Layout, PrefsState } from "app/prefs/state/state";
import { ToolbarToggle } from "./toggle/toggle";
import s from "./toolbar.module.css";

interface Props extends PrefsState {}

const Left = (props: Props): JSX.Element => (
	<div className={s.left}>
		{/* The actual ToolbarToggle is rendered at App. This only exists to
		push the Explorer button correctly */}
		<div className={s.toggle}>
			<ToolbarToggle prefs={props.prefs} setPrefs={props.setPrefs} />
		</div>
		<DivPx size={16} />
		<Button
			icon={Collection}
			children="Explorer"
			selected={props.prefs.explorerVisible}
			onClick={() => {
				props.setPrefs((prefs) => ({
					...prefs,
					explorerVisible: !prefs.explorerVisible,
				}));
			}}
		/>
	</div>
);

const Center = (props: Props): JSX.Element => (
	<div className={s.center}>
		<Switcher<Layout>
			options={[
				{ value: "editor", label: "Editor" },
				{ value: "split", label: "Split" },
				{ value: "preview", label: "Preview" },
			]}
			value={props.prefs.layout}
			setValue={(layout) => {
				props.setPrefs((prefs) => ({ ...prefs, layout }));
			}}
			fill
		/>
	</div>
);

const Right = (props: Props): JSX.Element => (
	<div className={s.right}>
		<Button icon={QuestionMarkCircle} children="Help" />
		<DivPx size={16} />
		<Button
			icon={Adjustments}
			children="Preferences"
			selected={props.prefs.prefsVisible}
			onClick={() => {
				props.setPrefs((prefs) => ({
					...prefs,
					prefsVisible: !prefs.prefsVisible,
				}));
			}}
		/>
	</div>
);

export const Toolbar = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<Pane>
			<div className={s.container}>
				<Left {...props} />
				<Center {...props} />
				<Right {...props} />
			</div>
		</Pane>
	</div>
);
