import lineStyle from "./line.module.css";
import underlineStyle from "./underline.module.css";
import blockStyle from "./block.module.css";

export enum CursorStyleName {
	block = "block",
	line = "line",
	underline = "underline",
	none = "none",
}

export interface CursorStyle {
	className: string;
}

const line: CursorStyle = {
	className: lineStyle.line,
};

const block: CursorStyle = {
	className: blockStyle.block,
};

const underline: CursorStyle = {
	className: underlineStyle.underline,
};

const none: CursorStyle = {
	className: "",
};

export const cursorStyles = {
	line,
	block,
	underline,
	none,
};
