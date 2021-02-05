import { Pane } from "@moai/core";
import s from "./prefs.module.css";
import { PrefsApp } from "./app/app";
import { PrefsLibrary } from "./library/library";
import { PrefsPreview } from "./preview/preview";
import { PrefsUser } from "./user/user";

export const Prefs = (): JSX.Element => (
	<div className={s.wrapper}>
		<Pane noPadding fullHeight>
			<div className={s.container}>
				<PrefsUser />
				<PrefsApp />
				<PrefsLibrary />
				<PrefsPreview />
			</div>
		</Pane>
	</div>
);
