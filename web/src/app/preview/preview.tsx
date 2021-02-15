import { background, border } from "@moai/core";
import { Editor } from "app/editor/state/state";
import { Prefs, Template } from "app/prefs/state/state";
import { usePreviewHtml } from "./effects/html";
import { usePreviewScroll } from "./effects/scroll";
import "./highlight/base.css";
import "./highlight/dark.css";
import "./highlight/light.css";
import s from "./preview.module.css";
import "./templates/blank.css";
import "./templates/github.css";
import "./templates/serif.css";

const templateClasses: Record<Template, string> = {
	blank: "template-blank",
	github: "template-github",
	serif: "template-serif",
};

interface Props {
	prefs: Prefs;
	editor: Editor;
}

export const Preview = (props: Props): JSX.Element => {
	const html = usePreviewHtml(props.editor);
	const containerRef = usePreviewScroll(props.editor);
	const template = templateClasses[props.prefs.template];
	return (
		<div
			ref={containerRef}
			className={[s.container, background.strong, border.weak].join(" ")}
		>
			<div
				className={["markdown-body", template].join(" ")}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
