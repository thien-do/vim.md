import { useEffect } from "react";
import { confirmUnsaved, FileProps } from "./file";

const makeUnloadStopper = () => {
	/** Flag to close even if unsaved */
	const forced = { current: false };

	const askToClose = async () => {
		if ((await confirmUnsaved()) === false) return;
		forced.current = true;
		(window as any).backend.winClose();
	};

	const handler = (event: BeforeUnloadEvent): void | string => {
		if (forced.current) return;
		askToClose();
		event.preventDefault();
		event.returnValue = "You have unsaved changes"; // Legacy
		return "You have unsaved changes"; // Legacy
	};
	return handler;
};

/**
 * Avoid closing window when having unsaved changes
 */
export const useFileUnload = (props: FileProps): void => {
	const { saved } = props.file;

	useEffect(() => {
		if (saved) return;
		const handler = makeUnloadStopper();
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [saved]);
};
