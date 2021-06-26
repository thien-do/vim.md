import { useEffect, useState } from "react";
import { Theme } from "./state";

const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const resolveTheme = (theme: Theme): "light" | "dark" => {
	if (theme === "light" || theme === "dark") return theme;
	const isDark = window.matchMedia(DARK_MODE_QUERY).matches;
	return isDark ? "dark" : "light";
};

export const usePrefsResolvedTheme = (original: Theme): "light" | "dark" => {
	const [resolved, setResolved] = useState(() => {
		return resolveTheme(original);
	});

	useEffect(() => {
		const resolved = resolveTheme(original);
		setResolved(resolved);

		// Watch for change if "system"
		if (original !== "system") return;
		const medias = window.matchMedia(DARK_MODE_QUERY);
		const listener = (event: MediaQueryListEvent): void => {
			setResolved(event.matches ? "dark" : "light");
		};
		medias.addEventListener("change", listener);
		return () => medias.removeEventListener("change", listener);
	}, [original]);

	return resolved;
};

const updateTheme = (theme: "light" | "dark"): void => {
	const classList = window.document.documentElement.classList;
	if (classList.contains(theme)) return;
	classList.remove("light", "dark");
	classList.add(theme);
};

export const usePrefsTheme = (original: Theme): void => {
	const resolved = usePrefsResolvedTheme(original);

	useEffect(() => {
		updateTheme(resolved);
	}, [resolved]);
};
