import { Button } from "@moai/core";
import { ChevronDown, ChevronRight } from "@moai/icon/hrs";
import { TreeNode, TreeProps } from "../tree";
import s from "./row.module.css";

interface Props extends TreeProps {}

// For indentation, like in source code
const Tab = () => (
	<div className={[Button.sizes.smallIcon.main, s.tab].join(" ")} />
);

const isLeaf = (node: TreeNode): boolean => {
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
	return (
		<div
			className={[
				s.container,
				Button.styles.flat.main,
				selected ? Button.styles.flat.selected : "",
			].join(" ")}
			// @TODO: Handle a11y properly
			onClick={() => {
				// @TODO: Handle multi-select case (e.g. Cmd + Click to add)
				props.setSelected(new Set([props.node.id]));
			}}
		>
			{[...Array(props.level ?? 0)].map((_v, i) => (
				<Tab key={i} />
			))}
			<div className={s.toggle}>
				{isLeaf(props.node) === false ? (
					<Button
						icon={expanded ? ChevronDown : ChevronRight}
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
