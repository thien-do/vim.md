import { FontFamily } from "app/prefs/state/state";
import s from "./editor.module.css";
import { EditorProps, useEditor } from "./state/state";
import "./style/style";

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

export const EditorPane = (props: EditorProps): JSX.Element => {
	const container = useEditor(props);
	const fontFamilyClass = fontFamilyClasses[props.prefs.fontFamily];
	return (
		<div
			className={[
				s.container,
				`font-family-${fontFamilyClass[0]}`,
				`font-var-${fontFamilyClass[1]}`,
				`font-size font-size-${props.prefs.fontSize}`,
			].join(" ")}
			style={{ "--line-length": props.prefs.lineLength } as React.CSSProperties}
			ref={container}
		/>
	);
};
