import { useEffect, useState } from "react";
import { Editor } from "../editor";
import debounce from "lodash.debounce";
import s from "./cursor.module.css";

export interface CursorPosition {
	top: number;
	left: number;
}

interface UncontrolledCursorProps {
	editor: Editor;
	offsetTop?: number;
	offsetLeft?: number;
}

export const UncontrolledCursor = (
	props: UncontrolledCursorProps
): JSX.Element => {
	const [blink, setBlink] = useState<boolean>(true);
	const [position, setPosition] = useState<CursorPosition>({
		top: 0,
		left: 0,
	});

	useEffect(() => {
		if (props.editor === null) return;

		let isSyncPaused = false;

		const turnOnBlinkDebounced = debounce(() => setBlink(true), 1000);

		const temporaryTurnOffBlink = () => {
			if (blink) setBlink(false);
			turnOnBlinkDebounced();
		};

		const syncCursor = (editor: Editor) => {
			if (editor === null || isSyncPaused) return;
			temporaryTurnOffBlink();
			const position = editor.cursorCoords(null, "local");
			if (props.offsetTop) position.top += props.offsetTop;
			if (props.offsetLeft) position.left += props.offsetLeft;
			setPosition(position);
		};

		// CodeMirror remove and re-intialize cursor when render new line
		// Thus, when Enter is captured (aka new line will be rendered),
		// we temporary pause cursor syncing process
		const pauseSyncOnEnter = (editor: Editor, name: any) => {
			if (name === "Enter") {
				isSyncPaused = true;
			}
		};

		// After CodeMirror updated DOM (aka new line is rendered),
		// we resume cursor syncing process
		const resumeSyncOnDOMUpdated = (editor: Editor) => {
			if (isSyncPaused) {
				isSyncPaused = false;
				syncCursor(editor);
			}
		};

		syncCursor(props.editor);
		props.editor.on("cursorActivity", syncCursor);
		props.editor.on("keyHandled", pauseSyncOnEnter);
		props.editor.on("update", resumeSyncOnDOMUpdated);

		return () => {
			props.editor?.off("cursorActivity", syncCursor);
			props.editor?.off("keyHandled", pauseSyncOnEnter);
			props.editor?.off("update", resumeSyncOnDOMUpdated);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editor, props.offsetTop, props.offsetLeft]);

	return (
		<>
			<Cursor blink={blink} position={position} />
		</>
	);
};

interface Props {
	blink: boolean;
	position: CursorPosition;
}

export const Cursor = (props: Props): JSX.Element => {
	return (
		<div
			className={[s.cursor, props.blink ? s.blink : ""].join(" ")}
			style={{ top: props.position.top, left: props.position.left }}
		/>
	);
};
