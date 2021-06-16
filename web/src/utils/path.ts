/**
 * input: "a/b/c/d/e.txt"
 * output: {
 *   directory: "a/b/c/d",
 *   name: "e",
 *   extension: "txt",
 *   fullName: "e.txt"
 * }
 */
const splitPath = (
	path: string
): {
	directory: string;
	name: string;
	fullName: string;
	extension: string;
} => {
	const lastDot = path.lastIndexOf(".");
	const extension = path.slice(lastDot + 1);
	const lastSlash = path.lastIndexOf("/");
	const name = path.slice(lastSlash + 1, lastDot);
	const fullName = path.slice(lastSlash + 1);
	const directory = path.slice(0, lastSlash);
	return { extension, name, directory, fullName };
};

/**
 * pathA: "a/b/c/d"
 * pathB: "a/b"
 * returns: "c"
 */
const oneStepCloser = (a: string, b: string): string => {
	const [lenA, lenB] = [a.length, b.length];
	if (lenA === lenB) throw Error("2 paths must have different length");
	const [long, short] = lenA > lenB ? [a, b] : [b, a];
	if (!long.startsWith(short))
		throw Error("One path must be the start of the other");
	const diff = long.replace(`${short}/`, ""); // "c/d"
	const parts = diff.split("/");
	return parts[0];
};

export const pathUtils = {
	oneStepCloser,
	splitPath,
};
