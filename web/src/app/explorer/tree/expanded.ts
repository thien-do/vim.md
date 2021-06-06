import { useEffect, useState } from "react";
import { SetState } from "utils/state";

const STORAGE_KEY = "vdm-explorer-expanded";

const save = (set: Set<string>): void => {
	const array = Array.from(set);
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
};

const load = (): Set<string> => {
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === null) return new Set();
	const array = JSON.parse(stored);
	if (Array.isArray(array) === true) return new Set(array);
	throw Error(`Stored "${STORAGE_KEY}" is not an array`);
};

export interface ExpandedState {
	expanded: Set<string>;
	setExpanded: SetState<Set<string>>;
}

export const useExpanded = (): ExpandedState => {
	const [expanded, setExpanded] = useState(load);
	useEffect(() => void save(expanded), [expanded]);
	return { expanded, setExpanded };
};
