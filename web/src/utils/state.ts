import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export const useStorageState = <T>(
	key: string,
	transform?: (t: T) => T
): [T | null, SetState<T | null>] => {
	const [value, setValue] = useState<T | null>(() => {
		const stored = window.localStorage.getItem(key);
		const value = stored === null ? null : JSON.parse(stored);
		return transform ? transform(value) : value;
	});

	useEffect(() => {
		if (value === null) {
			window.localStorage.removeItem(key);
		} else {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	return [value, setValue];
};
