import { Backend } from "./interface";
import { localBackendPathUtils } from "./path";
import { localBackendStorage } from "./storage";

/*
25: height of the title bar from the top to the bottom of the traffic light
4: the height of traffic lights is 12, while the (line-)height of our custom
title text is 20, so in order for them to be aligned, we should add 8px to the
top and bottom of the traffic light, which push the total height 4px downward
*/
const macTitleBarHeight = 25 + 4;

export const localBackend: Backend = {
	ui: { titleBarHeight: macTitleBarHeight },
	storage: localBackendStorage,
	path: localBackendPathUtils,
};
