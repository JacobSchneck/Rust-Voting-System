import express from 'express';
const router = express.Router();
import connectToDb from "../services/connectToDb";

let db = connectToDb();

// get all ballots
router.get('/', (req, res) => {
	const sql = "SELECT * from ballots";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// get a specific ballot
router.get('/:id', (req, res) => {
	const { id } = req.params;
	const sql = "SELECT * FROM ballots WHERE id = ?";
	db.all(sql, [id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

module.exports = router;