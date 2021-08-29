import { useEffect, useState } from "react";
import { Editor } from "../editor";
import debounce from "lodash.debounce";
import s from "./cursor.module.css";
import { CursorStyleName, cursorStyles } from "./style/style";

export interface CursorPosition {
	top: number;
	left: number;
}

interface UncontrolledCursorProps {
	editor: Editor;
	offsetTop?: number;
	offsetLeft?: number;
}

// https://github.com/codemirror/CodeMirror/blob/10510ba29e20ed42474237a68fbae0e27896b9d3/keymap/vim.js
interface VimMode {
	mode: "normal" | "visual" | "insert" | "replace";
	subMode: "linewise" | "blockwise";
}

export const UncontrolledCursor = (
	props: UncontrolledCursorProps
): JSX.Element => {
	const [blink, setBlink] = useState<boolean>(true);
	const [mode, setMode] = useState<VimMode["mode"]>("normal");
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

		// CodeMirror API definitions is not fulfilled
		// So that, I ignore typescript check
		// https://codemirror.net/doc/manual.html#vimapi_events
		// @ts-ignore
		props.editor.on("vim-mode-change", (mode: VimMode) => {
			setMode(mode.mode);
		});

		return () => {
			props.editor?.off("cursorActivity", syncCursor);
			props.editor?.off("keyHandled", pauseSyncOnEnter);
			props.editor?.off("update", resumeSyncOnDOMUpdated);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.editor, props.offsetTop, props.offsetLeft]);

	const getCursorStyle = (): CursorStyleName => {
		switch (mode) {
			case "insert":
				return Cursor.styles.line;
			case "replace":
				return CursorStyleName.underline;
			case "visual":
				return CursorStyleName.none;
			case "normal":
			default:
				return CursorStyleName.block;
		}
	};

	return (
		<>
			<Cursor
				blink={blink}
				position={position}
				style={getCursorStyle()}
			/>
		</>
	);
};

interface Props {
	blink: boolean;
	style: CursorStyleName;
	position: CursorPosition;
}

const getClass = (props: Props): string => {
	const classes = [s.cursor, cursorStyles[props.style].className];
	if (props.blink) classes.push(s.blink);
	return classes.join(" ");
};

export const Cursor = (props: Props): JSX.Element => {
	return (
		<div
			className={getClass(props)}
			style={{ top: props.position.top, left: props.position.left }}
		/>
	);
};

Cursor.styles = CursorStyleName;
