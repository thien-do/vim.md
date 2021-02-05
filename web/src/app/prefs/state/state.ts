import { useEffect, useState } from "react";
import { SetState } from "utils/state";

export type Layout = "editor" | "split" | "preview";
export type LineLength = 64 | 72 | 80;
export type FontFamily = "mono" | "duo" | "quattro";
// prettier-ignore
export type FontSize =
    | "4xs" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"
    | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl";
export type FileType = "all" | "md";
export type Template = "github" | "serif" | "blank";

export interface Prefs {
	toolbarVisible: boolean;
	explorerVisible: boolean;
	prefsVisible: boolean;
	layout: Layout;
	lineLength: LineLength;
	fontFamily: FontFamily;
	fontSize: FontSize;
	useTab: boolean;
	fileType: FileType;
	template: Template;
}

const defaultPrefs: Prefs = {
	toolbarVisible: true,
	explorerVisible: false,
	prefsVisible: false,
	layout: "editor",
	lineLength: 72,
	fontFamily: "mono",
	fontSize: "xl",
	useTab: true,
	fileType: "md",
	template: "github",
};

const STORAGE_KEY = "prefs";

export interface PrefsState {
	prefs: Prefs;
	setPrefs: SetState<Prefs>;
}

export type PrefsUpdate = (prefs: Prefs) => Prefs;

export const usePrefs = (): PrefsState => {
	const [prefs, setPrefs] = useState<Prefs>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored === null ? defaultPrefs : JSON.parse(stored);
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
	}, [prefs]);

	return { prefs, setPrefs };
};
