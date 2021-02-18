import CodeMirror from "codemirror";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/selection/active-line";
import "codemirror/keymap/vim";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";

/** Static configuration on creating new CM instance */
const config: CodeMirror.EditorConfiguration = {
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

	// This is only the initial value. It will be overriden at run-time
	indentWithTabs: true,

	// https://github.com/codemirror/CodeMirror/issues/988
	// CodeMirror always insert the Tab character on "Tab" key. This changes it
	// to follow the tab/space settings
	extraKeys: {
		Tab: (cm) => cm.execCommand("indentMore"),
		"Shift-Tab": (cm) => cm.execCommand("indentLess"),
	},
};

/** Static event handlers to apply after having a CM instance */
const addEventListeners = (editor: CodeMirror.Editor): void => {
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

/** Static configurations to apply to Vim */
const configVim = (): void => {
	// https://codemirror.net/doc/manual.html#vimapi
	const Vim = (CodeMirror as any).Vim;

	// Simple key map
	Vim.noremap("j", "gj");
	Vim.noremap("gj", "j");
	Vim.noremap("k", "gk");
	Vim.noremap("gk", "k");
	Vim.map("jj", "<Esc>", "insert");
	Vim.map("jk", "<Esc>", "insert");

	// Commands
	// Note that this is only a static map from vim keymap to CodeMirror's
	// command **names**. The actual implementations of these commands are
	// defined at render-time.

	const fn = (command: string) => (editor: CodeMirror.Editor) =>
		editor.execCommand(command);

	// Layout
	Vim.defineEx("preview", "p", fn("togglePreview"));
	Vim.defineEx("split", "sp", fn("toggleSplit"));
	Vim.defineEx("explorer", "e", fn("toggleExplorer"));
	Vim.defineEx("toolbar", "t", fn("toggleToolbar"));
	Vim.defineEx("preferences", "pr", fn("togglePrefs"));

	// Theme
	Vim.defineEx("dark", null, fn("setThemeDark"));
	Vim.defineEx("light", null, fn("setThemeLight"));

	// Operation
	Vim.defineEx("Write", "W", fn("save")); // ":w" is built-in
	Vim.defineEx("help", "h", fn("openHelp"));
	Vim.defineEx("quit", "q", fn("quit"));
	Vim.defineEx("wq", "wq", fn("saveAndQuit"));

	// Debug
	Vim.defineEx("syntax-test", null, fn("openSyntaxTest"));
};

const init = (element: HTMLElement): CodeMirror.Editor => {
	configVim();
	const editor = CodeMirror(element, config);
	addEventListeners(editor);
	return editor;
};

/** Define run-time implementation for CodeMirror's commands (e.g. "save") */
const setCommand = (
	name: string,
	fn: (editor: CodeMirror.Editor) => void
): void => {
	// See https://codemirror.net/doc/manual.html#commands
	(CodeMirror.commands as any)[name] = fn;
};

export const CodeMirrorUtils = { init, setCommand };
