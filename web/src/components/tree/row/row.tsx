import { Button } from "@moai/core";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { TreeNode, TreeProps } from "../tree";
import s from "./row.module.css";

interface Props extends TreeProps {}

// For indentation, like in source code
const Tab = () => (
	<div className={[Button.sizes.smallIcon.main, s.tab].join(" ")} />
);

const getIsLeaf = (node: TreeNode): boolean => {
	if (node.isLeaf === undefined) {
		return node.children === undefined; // Sync
	} else {
		return node.isLeaf; // Async
	}
};

const toggle = async (props: Props): Promise<void> => {
	const expanded = new Set(props.expanded);
	if (expanded.has(props.node.id)) {
		expanded.delete(props.node.id);
	} else {
		expanded.add(props.node.id);
	}
	props.setExpanded(expanded);
};

export const TreeItem = (props: Props): JSX.Element => {
	const expanded = props.expanded.has(props.node.id);
	const selected = props.selected.has(props.node.id);
	const isLeaf = getIsLeaf(props.node);
	return (
		<div
			className={[
				s.container,
				Button.styles.flat.main,
				selected ? Button.styles.flat.selected : "",
			].join(" ")}
			// @TODO: Handle a11y properly
			onClick={() => {
				if (isLeaf || props.parentMode === "select") {
					props.setSelected(new Set([props.node.id]));
				} else {
					toggle(props);
				}
			}}
		>
			{[...Array(props.level ?? 0)].map((_v, i) => (
				<Tab key={i} />
			))}
			<div className={s.toggle}>
				{isLeaf === false ? (
					<Button
						icon={expanded ? RiArrowDownSLine : RiArrowRightSLine}
						iconLabel={expanded ? "Collapse group" : "Expand group"}
						onClick={() => toggle(props)}
						style={Button.styles.flat}
						size={Button.sizes.smallIcon}
					/>
				) : (
					<Tab />
				)}
			</div>
			<div className={s.label}>{props.node.label}</div>
		</div>
	);
};
