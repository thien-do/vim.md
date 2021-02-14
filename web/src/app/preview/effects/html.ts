import { toHTML } from "@vimdotmd/markdown";
import { Editor } from "app/editor/editor";
import { useEffect, useState } from "react";

// Update HTML on editor's value changes
export const usePreviewHtml = (editor: Editor): string => {
	const [html, setHtml] = useState("");

	useEffect(() => {
        if (editor === null) return;
		const syncHtml = (instance: CodeMirror.Editor) => {
			const value = instance.getValue();
			setHtml(toHTML(value));
		};
		syncHtml(editor); // Initial value
		editor.on("change", syncHtml);
		return () => void editor.off("change", syncHtml);
	}, [editor]);

	return html;
};
