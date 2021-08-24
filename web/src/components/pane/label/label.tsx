import { DivPx } from "@moai/core";
import s from "./label.module.css";

interface Props {
	children?: React.ReactNode;
}

export const PaneLabel = (props: Props) => (
	<>
		<div className={s.container}>{props.children}</div>
		<DivPx size={16} />
	</>
);
