import { useEffect, useState } from "react";
import { Editor } from "../editor";
import debounce from "lodash.debounce";
import s from "./cursor.module.css";

export interface CursorPosition {
	top: number;
	left: number;
}

interface Props {
	editor: Editor;
	offsetTop?: number;
	offsetLeft?: number;
}

export const Cursor = (props: Props): JSX.Element => {
	const [blink, setBlink] = useState<boolean>(true);
	const [position, setPosition] = useState<CursorPosition>({
		top: 0,
		left: 0,
	});

	useEffect(() => {
		if (props.editor === null) return;

		const turnOnBlinkDebounced = debounce(() => setBlink(true), 1000);

		const temporaryTurnOffBlink = () => {
			if (blink) setBlink(false);
			turnOnBlinkDebounced();
		};

		const syncCursor = (editor: Editor) => {
			if (editor === null) return;
			temporaryTurnOffBlink();
			const position = editor.cursorCoords(null, "local");
			if (props.offsetTop) position.top += props.offsetTop;
			if (props.offsetLeft) position.left += props.offsetLeft;
			setPosition(position);
		};

		syncCursor(props.editor);
		props.editor.on("cursorActivity", syncCursor);

		return () => {
			props.editor?.off("cursorActivity", syncCursor);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editor, props.offsetTop, props.offsetLeft]);

	return (
		<div
			className={[s.cursor, blink ? s.blink : ""].join(" ")}
			style={{ top: position.top, left: position.left }}
		/>
	);
};
