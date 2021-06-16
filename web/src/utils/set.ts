import { useEffect, useState } from "react";
import { SetState } from "./state";

const useSetSave = (key: string, set: Set<string>): void => {
	useEffect(() => {
		const array = Array.from(set);
		window.localStorage.setItem(key, JSON.stringify(array));
	}, [set, key]);
};

const getInitialSet = (key: string): Set<string> => {
	const stored = window.localStorage.getItem(key);
	if (stored === null) return new Set();
	const array = JSON.parse(stored);
	if (Array.isArray(array) === true) return new Set(array);
	throw Error(`Stored "${key}" is not an array`);
};

type State = [Set<string>, SetState<Set<string>>];

export const useSetState = (key: string): State => {
	const [set, setSet] = useState(() => getInitialSet(key));
	useSetSave(key, set);
	return [set, setSet];
};
