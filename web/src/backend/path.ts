import { BackendPathUtils } from "./interface";

const parse: BackendPathUtils["parse"] = (path: string) => {
	const base = path.replace("docs/root/", "");
	return { root: "docs", dir: "docs/root", base, name: base, ext: "" };
};

export const localBackendPathUtils: BackendPathUtils = {
	parse,
};
