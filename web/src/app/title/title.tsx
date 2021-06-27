import { Prefs } from "app/prefs/state/state";
import { Backend } from "backend/interface";
import { SetState } from "utils/state";
import { TitleNative } from "./native/native";
import { TitleCustom } from "./custom/custom";
import { File } from "app/file/file";

interface Props {
	backend: Backend;
	file: File;
	prefs: Prefs;
	setPrefs: SetState<Prefs>;
}

export const Title = (props: Props): JSX.Element =>
	props.backend.ui.titleBar === null ? (
		<TitleNative
			file={props.file}
			prefs={props.prefs}
			setPrefs={props.setPrefs}
			path={props.backend.path}
		/>
	) : (
		<TitleCustom
			file={props.file}
			prefs={props.prefs}
			setPrefs={props.setPrefs}
			backend={props.backend}
		/>
	);
