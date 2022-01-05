// Aw ya, writing scuffed typescript
const paginatedResults = (model: any[], page: number | null, limit: number | null) => {
	// return (req: any, res: any, next: any) => {
		// const page = parseInt(req.query.page);
		// const limit = parseInt(req.query.limit);

		console.log(page);
		console.log(limit);
		if (!page || !limit) return;

		console.log("paginate");

		// const startIndex = (page - 1) * limit;
		// const endIndex = page * limit;

		// const results: any = {};
		
		// console.log(model);

		// if (endIndex < model.length) {
		// 	results.next = {
		// 		page:page + 1,
		// 		limit: limit,
		// 	}
		// }

		// if (startIndex > 0) {
		// 	results.prev = {
		// 		page: page - 1,
		// 		limit: limit,
		// 	}
		// }

		// results.results = model.slice(startIndex, endIndex);
		// res.paginatedResults = results
		// console.log(res);
}

export default paginatedResults;