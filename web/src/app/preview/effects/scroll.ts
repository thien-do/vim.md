import { Editor } from "app/editor/editor";
import { useEffect, useRef } from "react";

type Ref = React.RefObject<HTMLDivElement>;

const cursorActivityListener = (editor: CodeMirror.Editor): void => {
	const line = editor.getCursor().line;
	if (line === 0) {
		const container = document.querySelector(".markdown-body");
		container?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		const element = document.querySelector(`[data-line="${line}"]`);
		element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
	}
};

export const usePreviewScroll = (editor: Editor): Ref => {
	const containerRef = useRef(null);

	useEffect(() => {
		if (editor === null) return;
		editor.on("cursorActivity", cursorActivityListener);
		return () => editor.off("cursorActivity", cursorActivityListener);
	}, [editor]);

	return containerRef;
};
