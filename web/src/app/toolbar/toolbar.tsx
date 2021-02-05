import { Button, DivPx, Pane, Switcher } from "@moai/core";
import { Adjustments, Collection, QuestionMarkCircle } from "@moai/icon/hrs";
import { Layout, PrefsState } from "app/prefs/state/state";
import { ToolbarToggle } from "./toggle/toggle";
import s from "./toolbar.module.css";

interface Props extends PrefsState {}

export const Toolbar = (props: Props): JSX.Element => (
	<div className={s.wrapper}>
		<Pane>
			<div className={s.container}>
				<div className={s.left}>
					{/* The actual ToolbarToggle is rendered at App. This only
					exists to push the Explorer button correctly */}
					<div className={s.toggle}>
						<ToolbarToggle prefs={props.prefs} setPrefs={props.setPrefs} />
					</div>
					<DivPx size={16} />
					<Button icon={Collection} children="Explorer" />
				</div>
				<div className={s.center}>
					<Switcher<Layout>
						options={[
							{ value: "editor", label: "Editor" },
							{ value: "split", label: "Split" },
							{ value: "preview", label: "Preview" },
						]}
						value="editor"
						setValue={(layout) => {
							props.setPrefs((p) => ({ ...p, layout }));
						}}
						fill
					/>
				</div>
				<div className={s.right}>
					<Button icon={QuestionMarkCircle} children="Help" />
					<DivPx size={16} />
					<Button icon={Adjustments} children="Preferences" />
				</div>
			</div>
		</Pane>
	</div>
);
