import { FontFamily, Prefs } from "app/prefs/state/state";
import { useEffect, useRef } from "react";
import { SetState } from "utils/state";
import s from "./editor.module.css";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import "./style/style";

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

export type Editor = CodeMirror.Editor | null;

interface Props {
	prefs: Prefs;
	editor: Editor;
	setEditor: SetState<Editor>;
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
