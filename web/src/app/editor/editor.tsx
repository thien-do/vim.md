import { FontFamily, Prefs } from "app/prefs/state/state";
import { useEffect, useRef } from "react";
import s from "./editor.module.css";
import { CodeMirrorUtils } from "./state/codemirror/codemirror";
import { EditorState } from "./state/state";
import "./style/style";

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

interface Props extends EditorState {
	prefs: Prefs;
}

export const EditorPane = (props: Props): JSX.Element => {
	const container = useRef<HTMLDivElement>(null);
	const { editor, setEditor, prefs } = props;

	useEffect(() => {
		if (editor !== null) return;
		if (container.current === null)
			throw Error("Container for editor is not defined");
		const instance = CodeMirrorUtils.init(container.current);
		setEditor(instance);
	}, [editor, setEditor]);

	const fontFamilyClass = fontFamilyClasses[prefs.fontFamily];
	return (
		<div
			className={[
				s.container,
				`font-family-${fontFamilyClass[0]}`,
				`font-var-${fontFamilyClass[1]}`,
				`font-size font-size-${prefs.fontSize}`,
			].join(" ")}
			style={{ "--line-length": prefs.lineLength } as React.CSSProperties}
			ref={container}
		/>
	);
};
