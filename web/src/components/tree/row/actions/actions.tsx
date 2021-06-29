import { Button, ButtonMenu } from "@moai/core";
import { TreeProps } from "../../tree";
import { RiMore2Fill } from "react-icons/ri";

interface Props extends TreeProps {}

export const TreeRowActions = (props: Props): JSX.Element | null => {
	const actions = props.getRowActions?.(props.node) ?? [];
	if (actions.length === 0) return null;
	return (
		<div
			onClick={(event) => {
				event.stopPropagation();
			}}
		>
			<ButtonMenu
				button={{
					icon: RiMore2Fill,
					iconLabel: "More actions",
					style: Button.styles.flat,
					size: Button.sizes.small,
				}}
				items={actions}
			/>
		</div>
	);
};
