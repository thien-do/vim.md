import { Background, Border, MutedDiv } from "@moai/core";
import s from "./header.module.css";

interface Props {
	title: string;
}

export const PaneHeader = (props: Props) => (
	<Background color="weak">
		<header className={s.container}>
			<div className={s.title}>
				<MutedDiv>{props.title}</MutedDiv>
			</div>
			<div className={s.side} />
		</header>
		<Border color="weak" />
	</Background>
);
