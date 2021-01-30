// import { render } from "@vimdotmd/editor";

// (async () => {
// 	const num = await (window as any).backend.get42();
// 	console.log("num", num);
// })();

const container = document.getElementById("root");
if (container === null) throw Error("#root is not defined");
console.log("container", container);
(window as any).backend.render();
