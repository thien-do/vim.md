(async () => {
	const num = await (window as any).backend.get42();
	console.log("num", num);
})();
