import { Backend } from "./interface";
import { localBackendPathUtils } from "./path";
import { localBackendStorage } from "./storage";

export const localBackend: Backend = {
	ui: { titleBarHeight: 28 },
	storage: localBackendStorage,
	path: localBackendPathUtils,
};
