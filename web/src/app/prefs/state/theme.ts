import { useEffect } from "react";
import { Theme } from "./state";

const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const resolveTheme = (theme: Theme): "light" | "dark" => {
	if (theme === "light" || theme === "dark") return theme;
	const isDark = window.matchMedia(DARK_MODE_QUERY).matches;
	return isDark ? "dark" : "light";
};

const updateTheme = (theme: "light" | "dark"): void => {
	const classList = window.document.documentElement.classList;
	if (classList.contains(theme)) return;
	classList.remove("light", "dark");
	classList.add(theme);
};

export const usePrefsTheme = (theme: Theme): void => {
	// Set class to HTML
	useEffect(() => {
		const resolved = resolveTheme(theme);
		updateTheme(resolved);
	}, [theme]);

	// Watch for change if "system"
	useEffect(() => {
		if (theme !== "system") return;
		const medias = window.matchMedia(DARK_MODE_QUERY);
		const listener = (event: MediaQueryListEvent): void => {
			updateTheme(event.matches ? "dark" : "light");
		};
		medias.addEventListener("change", listener);
		return () => medias.removeEventListener("change", listener);
	}, [theme]);
};
