import { Backend } from "./interface";
import { localBackendPathUtils } from "./path";
import { localBackendStorage } from "./storage";

export const localBackend: Backend = {
	ui: { titleBar: null },
	storage: localBackendStorage,
	path: localBackendPathUtils,
};
