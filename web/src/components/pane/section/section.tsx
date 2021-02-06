import { PaneHeading } from "../heading/heading";
import s from "./section.module.css";

interface Props {
	heading: string;
	children: React.ReactNode;
}

export const PaneSection = (props: Props) => (
	<div>
		<PaneHeading children={props.heading} />
		<div className={s.body}>{props.children}</div>
	</div>
);
