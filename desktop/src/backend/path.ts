import { BackendPathUtils } from "./interface";
import nodePath from "path";

const parse: BackendPathUtils["parse"] = (path: string) => {
	return nodePath.parse(path);
};

export const localBackendPathUtils: BackendPathUtils = {
	parse,
};
