import { Backend } from "./interface";
import { localBackendPathUtils } from "./path";
import { localBackendStorage } from "./storage";
import { localBackendUIConfig } from "./ui";

export const localBackend: Backend = {
	ui: localBackendUIConfig,
	storage: localBackendStorage,
	path: localBackendPathUtils,
};
