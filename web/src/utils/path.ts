/**
 * input: "a/b/c/d/e.txt"
 * output: {
 *   directory: "a/b/c/d",
 *   name: "e",
 *   extension: ".txt",
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
	const lastSlash = path.lastIndexOf("/");
	const fullName = path.slice(lastSlash + 1);
	const directory = path.slice(0, lastSlash);

	const lastDot = path.lastIndexOf(".");
	const noExt = lastDot === -1 || lastDot < lastSlash;
	const extension = noExt ? "" : path.slice(lastDot);
	const name = noExt
		? fullName
		: fullName.slice(0, fullName.lastIndexOf(extension));

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
