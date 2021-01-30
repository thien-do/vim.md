import { render as reactRender } from "react-dom";

const Editor = () => (
	<div>
		<p>Hello world!</p>
		<textarea />
	</div>
);

export const render = () => {
	reactRender(<Editor />, document.getElementById("root"));
};
