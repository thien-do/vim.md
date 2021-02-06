import { background, border, text } from "@moai/core";
import { ReactNode } from "react";
import s from "./heading.module.css";

interface Props {
	children: string;
	aside?: ReactNode;
}

export const PaneHeading = (props: Props) => (
	<header className={[s.container, background.weak, border.weak].join(" ")}>
		<div
			className={[s.children, text.muted].join(" ")}
			children={props.children}
		/>
		<div className={s.aside} children={props.aside} />
	</header>
);
