import { useState } from "react";
import { Button, Pane, Switcher } from "@moai/core";
import { Layout, PrefsState } from "app/prefs/state/state";
import { BackendUIConfig } from "backend/interface";
import { RiFolderLine, RiQuestionLine, RiSettingsLine } from "react-icons/ri";
import { CodeMirrorUtils } from "app/editor/codemirror/codemirror";
import { TitleToolbar } from "../title/toolbar/toolbar";
import { Help } from "./help/help";
import s from "./toolbar.module.css";

interface Props extends PrefsState {
	ui: BackendUIConfig;
}

interface RightProps extends Props {
	toggleHelp: (val: boolean) => void;
}

const Left = (props: Props): JSX.Element => (
	<div className={s.left}>
		{/* The actual ToolbarToggle is rendered at App. This only exists to
		push the Explorer button correctly */}
		{props.ui.titleBar === null && (
			<div className={s.toggle}>
				<TitleToolbar
					size={Button.sizes.medium}
					prefs={props.prefs}
					setPrefs={props.setPrefs}
				/>
			</div>
		)}
		<Button
			icon={RiFolderLine}
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
	<div className={[s.center].join(" ")}>
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

const Right = (props: RightProps): JSX.Element => (
	<div className={s.right}>
		<Button icon={RiQuestionLine} children="Help" onClick={() => props.toggleHelp(true)} />
		<Button
			icon={RiSettingsLine}
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

export const Toolbar = (props: Props): JSX.Element => {
	const [showHelp, toggleHelp] = useState(false);
	CodeMirrorUtils.setCommand("openHelp", () => toggleHelp(true));

	return (
		<div className={s.wrapper}>
			<Pane>
				<div className={s.container}>
					<Left {...props} />
					<Center {...props} />
					<Right {...props} toggleHelp={toggleHelp} />
				</div>
			</Pane>
			<Help visible={showHelp} toggle={toggleHelp} />
		</div>
	)
};
