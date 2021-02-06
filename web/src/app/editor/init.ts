import CodeMirror from "codemirror";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/selection/active-line";
import "codemirror/keymap/vim";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";

/** Static configuration to create new CM instance */
const initialConfig: CodeMirror.EditorConfiguration = {
	scrollbarStyle: "native",
	mode: "gfm",
	keyMap: "vim",
	cursorScrollMargin: 90, // should be dynamic?
	lineWrapping: true,
	autofocus: true,
	lineNumbers: true,
	styleActiveLine: true,
	spellcheck: true, // not sure if it works
	showCursorWhenSelecting: true,

	// https://github.com/vimdotmd/writer/issues/111
	// "contenteditable" has better IME support but:
	// - We can't customize the native caret
	// - The caret isn't shown if editor is empty
	// so for now we still use "textarea"
	inputStyle: "textarea",

	// Markdown's indentation should be 4 spaces (if not tab)
	// https://github.github.com/gfm/#tabs
	// https://daringfireball.net/projects/markdown/syntax#precode
	indentUnit: 4,
	tabSize: 4,

	// This is only the initial value. It will be override via useEditorIndent
	// effect at run-time
	indentWithTabs: true,

	// https://github.com/codemirror/CodeMirror/issues/988
	// CodeMirror always insert the Tab character on "Tab" key. This changes it
	// to follow the tab/space settings
	extraKeys: {
		Tab: (cm) => cm.execCommand("indentMore"),
		"Shift-Tab": (cm) => cm.execCommand("indentLess"),
	},
};

/** Dynamic configuration to apply on newly created CM instance */
const applyConfig = (editor: CodeMirror.Editor): void => {
	// relative line number
	// https://github.com/codemirror/CodeMirror/issues/4116#issuecomment-426877029
	editor.on("cursorActivity", (editor) => {
		const curr = editor.getCursor().line + 1;
		if (editor.state.curLineNum === curr) return;
		editor.state.curLineNum = curr;
		const format = (l: number) => `${l === curr ? curr : Math.abs(curr - l)}`;
		editor.setOption("lineNumberFormatter", format);
	});
	// re-measure things on font changes
	(document as any).fonts.onloadingdone = () => editor.refresh();
};

// Default/global Vim configurations. This is only a static map from vim keymap
// to CodeMirror's command names. The implementations of these commands are
// defined statically at render-time. See "commands.ts" file for more detail.
(function applyVimGlobalConfig() {
	const Vim = (CodeMirror as any).Vim;

	// Key map
	Vim.noremap("j", "gj");
	Vim.noremap("gj", "j");
	Vim.noremap("k", "gk");
	Vim.noremap("gk", "k");
	Vim.map("jj", "<Esc>", "insert");
	Vim.map("jk", "<Esc>", "insert");

	// Commands
	const fn = (command: string) => (editor: CodeMirror.Editor) =>
		editor.execCommand(command);

	// Layout
	Vim.defineEx("edit", "e", fn("toggleLibrary"));
	Vim.defineEx("editor", "ed", fn("showEditor"));
	Vim.defineEx("preview", "p", fn("showPreview"));
	Vim.defineEx("split", "sp", fn("showSplit"));
	Vim.defineEx("vsplit", "vsp", fn("showSplit"));
	Vim.defineEx("library", "l", fn("toggleLibrary"));
	Vim.defineEx("toolbar", "t", fn("toggleToolbar"));
	Vim.defineEx("preferences", "pr", fn("togglePrefs"));
	// Theme
	Vim.defineEx("dark", null, fn("setThemeDark"));
	Vim.defineEx("light", null, fn("setThemeLight"));
	// Operation
	Vim.defineEx("Write", "W", fn("save")); // ":w" is built-in
	Vim.defineEx("help", "h", fn("openHelp"));
	Vim.defineEx("quit", "q", fn("createDraft"));
	Vim.defineEx("wq", "wq", fn("saveAndQuit"));
	// Debug
	Vim.defineEx("syntax-test", null, fn("openSyntaxTest"));
})();

export const initEditor = (element: HTMLElement): CodeMirror.Editor => {
	const editor = CodeMirror(element, initialConfig);
	applyConfig(editor);
	return editor;
};
