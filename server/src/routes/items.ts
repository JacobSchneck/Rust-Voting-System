import express from 'express';
const router = express.Router();
import connectToDb from "../services/connectToDb";

let db = connectToDb();

//--------------------- GETS -------------------------

// get all items
router.get('/', (req, res) => {
	const sql = "SELECT * from items";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

//--------------------- POSTS-------------------------

module.exports = router;