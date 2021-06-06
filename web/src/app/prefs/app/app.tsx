import { PaneSection } from "components/pane/section/section";
import { PrefsState } from "../state/state";
import { PrefsTheme } from "./theme/theme";

interface Props extends PrefsState {}

export const PrefsApp = (props: Props): JSX.Element => (
	<PaneSection heading="App">
		<PrefsTheme {...props} />
	</PaneSection>
);
