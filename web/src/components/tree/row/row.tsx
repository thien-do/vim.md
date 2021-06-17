import { useState } from "react";
import { Button } from "@moai/core";
import { RiArrowDownSLine, RiArrowRightSLine, RiMoreFill } from "react-icons/ri";
import { TreeProps } from "../tree";
import { isTreeLeaf } from "../utils/leaf";
import s from "./row.module.css";

interface Props extends TreeProps { }

// For indentation, like in source code
const Tab = () => (
	<div className={[Button.sizes.smallIcon.main, s.tab].join(" ")} />
);

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
	const [isMouseOn, setMouseOn] = useState<boolean>(false);
	const expanded = props.expanded.has(props.node.id);
	const selected = props.selected.has(props.node.id);
	const isLeaf = isTreeLeaf(props.node);
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
			onMouseEnter={() => setMouseOn(true)}
			onMouseLeave={() => setMouseOn(false)}
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
			{isLeaf && isMouseOn &&
				<div className={s.action}>
					<Button
						icon={RiMoreFill}
						iconLabel="More"
						style={Button.styles.flat}
						size={Button.sizes.smallIcon}
					/>
				</div>
			}
		</div>
	);
};
