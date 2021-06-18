import { BackendPathUtils } from "./interface";

const parse: BackendPathUtils["parse"] = (path: string) => {
	const base = path.replace("root/", "");
	return { root: "root", dir: "root", base, name: base, ext: "" };
};

export const localBackendPathUtils: BackendPathUtils = {
	parse,
};
