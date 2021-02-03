import { Button, DivPx, Pane, Switcher } from "@moai/core";
import { Adjustments, Collection, QuestionMarkCircle } from "@moai/icon/hrs";
import { ToolbarToggle } from "./toggle/toggle";
import s from "./toolbar.module.css";

export const Toolbar = (): JSX.Element => (
	<div className={s.wrapper}>
		<Pane>
			<div className={s.container}>
				<div className={s.left}>
					{/* The actual ToolbarToggle is rendered at App. This only
					exists to push the Explorer button correctly */}
					<div className={s.toggle}>
						<ToolbarToggle />
					</div>
					<DivPx size={16} />
					<Button icon={Collection} children="Explorer" />
				</div>
				<div className={s.center}>
					<Switcher
						options={[
							{ value: "editor", label: "Editor" },
							{ value: "split", label: "Split" },
							{ value: "preview", label: "Preview" },
						]}
						value="editor"
						setValue={() => {}}
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
