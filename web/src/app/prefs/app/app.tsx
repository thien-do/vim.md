import { ThemeState } from "@moai/core";
import { PaneSection } from "components/pane/section/section";
import { PrefsTheme } from "./theme/theme";

interface Props extends ThemeState {}

export const PrefsApp = (props: Props): JSX.Element => (
	<PaneSection heading="App">
		<PrefsTheme {...props} />
	</PaneSection>
);
