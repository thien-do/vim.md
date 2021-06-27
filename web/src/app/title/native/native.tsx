import { Button } from "@moai/core";
import { File } from "app/file/file";
import { Prefs } from "app/prefs/state/state";
import { BackendPathUtils } from "backend/interface";
import { Helmet } from "react-helmet-async";
import { SetState } from "utils/state";
import { getDocumentTitle } from "../document/document";
import { TitleToolbar } from "../toolbar/toolbar";
import s from "./native.module.css";
import { TitleNativeTheme } from "./theme";

interface Props {
	file: File;
	path: BackendPathUtils;
	prefs: Prefs;
	setPrefs: SetState<Prefs>;
}

/**
 * Component to handle the native title bar. It does not render a custom one
 * but render the toolbar toggle on top of the toolbar. Also take care of
 * document.title
 */
export const TitleNative = (props: Props): JSX.Element => {
	const { file, path } = props;
	return (
		<>
			<Helmet>
				<title children={getDocumentTitle({ file, path })} />
			</Helmet>
			<TitleNativeTheme prefs={props.prefs} />
			<div className={s.toolbar}>
				<TitleToolbar
					size={Button.sizes.medium}
					prefs={props.prefs}
					setPrefs={props.setPrefs}
				/>
			</div>
		</>
	);
};
