import { PaneSection } from "components/pane/section/section";
import { PrefsState } from "../state/state";
import { PrefsFileType } from "./filetype/filetype";

interface Props extends PrefsState {}

export const PrefsExplorer = (props: Props): JSX.Element => (
	<PaneSection heading="Explorer">
		<PrefsFileType {...props} />
	</PaneSection>
);
