import { Prefs } from "app/prefs/state/state";
import { usePrefsResolvedTheme } from "app/prefs/state/theme";
import { createElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
	prefs: Prefs;
}

export const TitleNativeTheme = (props: Props): JSX.Element => {
	const [content, setContent] = useState("hsl(20, 50%, 50%");
	const theme = usePrefsResolvedTheme(props.prefs.theme);
	const toolbarVisible = props.prefs.toolbarVisible;

	useEffect(() => {
		window.setTimeout(() => {
			const style = window.getComputedStyle(document.documentElement);
			const bgKey = toolbarVisible ? "strong" : "weak";
			const color = style.getPropertyValue(`--background-${bgKey}`);
			setContent(color);
			// Delay so that the style is computed after the theme is changed
		}, 0);
	}, [toolbarVisible, theme]);

	return (
		<Helmet>
			{/* Cannot use jsx since "meta"'s typing doesn't accept "media" yet */}
			{createElement("meta", {
				name: "theme-color",
				content,
				media: "(prefers-color-scheme: light)",
			})}
			{createElement("meta", {
				name: "theme-color",
				// The trick here is to use the same "content" color for both
				// "light" and "dark" color scheme, since we have our own custom
				// theming option
				content,
				media: "(prefers-color-scheme: dark)",
			})}
		</Helmet>
	);
};
