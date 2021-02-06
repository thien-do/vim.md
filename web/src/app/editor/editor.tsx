import { useEffect, useRef, useState } from "react";
import { Store } from "store/store";
import { initEditor } from "./init";
import s from "./editor.module.css";
import { FontFamily, PrefsState } from "app/prefs/state/state";

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
	const [content, setContent] = useState("");
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = container.current;
		if (element === null) throw Error("Editor container is null");
		initEditor(element);
	}, []);

	const { read } = props.store;
	useEffect(() => {
		(async () => {
			if (props.filePath === null) return void setContent("");
			setContent(await read(props.filePath));
		})();
	}, [props.filePath, read]);

	const fontFamilyClass = fontFamilyClasses[props.prefs.fontFamily];
	return (
		<div
			className={[
				s.editor,
				`font-family-${fontFamilyClass[0]}`,
				`font-var-${fontFamilyClass[1]}`,
				`font-size font-size-${props.prefs.fontSize}`,
			].join(" ")}
			style={{ "--line-length": props.prefs.lineLength } as React.CSSProperties}
			ref={container}
		/>
	);
};
