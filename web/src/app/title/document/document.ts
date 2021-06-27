import { File } from "app/file/file";
import { BackendPathUtils } from "backend/interface";

interface Params {
	file: File;
	path: BackendPathUtils;
}

export const getDocumentTitle = (params: Params): string => {
	const { path, file } = params;
	const title = file.path ? path.parse(file.path).base : "Untitled";
	const unsaved = file === null || file.saved === false;
	const prefix = unsaved ? "• " : "";
	return `${prefix}${title} — Vim.md`;
};
