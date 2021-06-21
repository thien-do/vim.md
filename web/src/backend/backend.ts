import { Backend } from "./interface";
import { localBackend } from "./local";

const backend: Backend = (window as any).backend?.backend ?? localBackend;

export const useBackend = (): Backend => {
	// @TODO: Allow users to choose other backend (e.g. github)
	return backend;
};
