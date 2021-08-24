import { FontFamily, Prefs } from "app/prefs/state/state";
import { useEffect, useRef } from "react";
import { SetState } from "utils/state";
import s from "./editor.module.css";
import { CodeMirrorUtils } from "./codemirror/codemirror";
import "./style/style";
import { Cursor } from "./cursor/cursor";
import { render } from "react-dom";

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

const codeMirrorLinesPaddingTop = 96;

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

	useEffect(() => {
		if (editor === null) return;
		const root = document.getElementsByClassName("CodeMirror-cursors")[0];
		if (root?.parentNode) {
			const container = document.createElement("div");
			root.parentNode.appendChild(container);
			render(
				<Cursor
					editor={editor}
					offsetTop={-codeMirrorLinesPaddingTop}
				/>,
				container
			);
		}
	}, [editor]);

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
