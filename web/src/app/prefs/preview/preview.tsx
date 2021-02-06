import { PaneSection } from "components/pane/section/section";
import { PrefsState } from "../state/state";
import { PrefsTemplate } from "./template/template";

interface Props extends PrefsState {}

export const PrefsPreview = (props: Props): JSX.Element => (
	<PaneSection heading="Preview">
		<PrefsTemplate {...props} />
	</PaneSection>
);
