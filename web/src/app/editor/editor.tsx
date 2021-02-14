import { FontFamily, PrefsState } from "app/prefs/state/state";
import { useEffect, useRef } from "react";
import { Store } from "store/store";
import { SetState } from "utils/state";
import s from "./editor.module.css";
import { initEditor } from "./init";
import "./style/style";

const ERRORS = {
	EDITOR: "Editor is not initialized",
	CONTAINER: "Container for editor is not defined",
};

export type Editor = CodeMirror.Editor | null;

export interface EditorState {
	editor: Editor;
	setEditor: SetState<Editor>;
}

interface Props extends PrefsState, EditorState {
	store: Store;
	filePath: string | null;
}

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

export const EditorPane = (props: Props): JSX.Element => {
	const container = useRef<HTMLDivElement>(null);

	const { editor, setEditor } = props;
	useEffect(() => {
		if (editor !== null) return;
		if (container.current === null) throw Error(ERRORS.CONTAINER);
		setEditor(initEditor(container.current));
	}, [editor, setEditor]);

	const [{ filePath }, { read }] = [props, props.store];
	useEffect(() => {
		(async () => {
			if (filePath === null) return;
			const content = await read(filePath);
			if (editor === null) throw Error(ERRORS.EDITOR);
			editor.setValue(content);
		})();
	}, [filePath, editor, read]);

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
