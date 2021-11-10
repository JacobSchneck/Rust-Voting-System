import express from 'express';
const router = express.Router();
import connectToDb from "../services/connectToDb";

let db = connectToDb();

//--------------------- GETS -------------------------

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

// tally votes on a ballot
router.get('/:ballot_id/votes', (req, res) => {
	const {ballot_id} = req.params;
	const sql = `
		SELECT
			users.username AS username,	
			ballots.title AS title,
			items.item AS item, 
			COUNT() AS tally
		FROM votes
		INNER JOIN items ON votes.item_id = items.id 
		INNER JOIN ballots ON  ballots.id = items.ballot_id
		INNER JOIN users ON users.id = ballots.user_id
		WHERE ballots.id = ?
		GROUP BY votes.item_id;
	`;
	db.all(sql, [ballot_id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

//--------------------- POSTS-------------------------

module.exports = router;