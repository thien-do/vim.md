import { Backend } from "./interface";
import { localBackend } from "./local";

export const backend: Backend =
	(window as any).backend?.backend ?? localBackend;
