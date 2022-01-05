import express from 'express';
const db = require('../../db/index.js');
const router = express.Router();


//--------------------- GETS -------------------------

// get all items
router.get('/', async (req, res) => {
	const sql = "SELECT * from items";
	try {
		const { rows } = await db.query(sql, []);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error with retrieving data");
	}
});

//--------------------- POSTS-------------------------

module.exports = router;