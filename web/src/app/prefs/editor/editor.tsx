import { DivPx } from "@moai/core";
import { PaneSection } from "components/pane/section/section";
import { PrefsState } from "../state/state";
import { PrefsFontFamily } from "./family/family";
import { PrefsIndent } from "./indent/indent";
import { PrefsLineLength } from "./length/length";
import { PrefsFontSize } from "./size/size";

interface Props extends PrefsState {}

export const PrefsEditor = (props: Props): JSX.Element => (
	<PaneSection heading="Editor">
		<PrefsFontFamily {...props} />
		<DivPx size={32} />
		<PrefsFontSize {...props} />
		<DivPx size={12} />
		<PrefsLineLength {...props} />
		<DivPx size={32} />
		<PrefsIndent {...props} />
	</PaneSection>
);
