import { useEffect, useRef, useState } from "react";
import { Store } from "store/store";
import { initEditor } from "./init";
import s from "./editor.module.css";
import { FontFamily, PrefsState } from "app/prefs/state/state";
import "./style/style";

const ERRORS = {
	EDITOR: "Editor is not initialized",
	CONTAINER: "Container for editor is not defined",
};

interface Props extends PrefsState {
	store: Store;
	filePath: string | null;
}

const fontFamilyClasses: Record<FontFamily, [string, string]> = {
	mono: ["mono", "mono-duo"],
	duo: ["duo", "mono-duo"],
	quattro: ["quattro", "quattro"],
};

export const Editor = (props: Props): JSX.Element => {
	const container = useRef<HTMLDivElement>(null);
	const editor = useRef<CodeMirror.Editor | null>(null);

	useEffect(() => {
		if (editor.current !== null) return;
		if (container.current === null) throw Error(ERRORS.CONTAINER);
		editor.current = initEditor(container.current);
	}, []);

	const { read } = props.store;
	useEffect(() => {
		(async () => {
			if (props.filePath === null) return;
			const content = await read(props.filePath);
			if (editor.current === null) throw Error(ERRORS.EDITOR);
			editor.current.setValue(content);
		})();
	}, [props.filePath, read]);

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
