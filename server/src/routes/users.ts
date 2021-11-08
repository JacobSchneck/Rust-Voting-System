import express from 'express';
const router = express.Router();
import connectToDb from "../services/connectToDb";

let db = connectToDb();

// get all users
router.get('/', (req, res) => {
	const sql = "SELECT * from users";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all users and ballots
router.get('/ballots', (req, res) => {
	const sql = `SELECT 
		users.username as username,
		ballots.title as title,
		ballots.id as ballot_id
	FROM users
	JOIN ballots on users.id = ballots.user_id`;
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all ballots made by user
router.get('/:user_id/ballots', (req, res) => {
	const { user_id } = req.params;
	const sql = `
		SELECT 
			users.username AS username,
			ballots.title AS title
		FROM users
		INNER JOIN ballots ON 
			ballots.user_id = users.id
		WHERE users.id = ?;
	`;
	db.all(sql, [user_id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all items on a ballot 
router.get('/:user_id/ballots/:ballot_id', (req, res) => {
	const { user_id, ballot_id } = req.params;
	const sql = `
		SELECT
			users.username AS username,	
			ballots.title as title,
			items.item as item
		FROM items
		INNER JOIN ballots ON  ballots.id = items.ballot_id
		INNER JOIN users ON users.id = ballots.user_id
		WHERE users.id = ? AND ballots.id = ?
	`
	db.all(sql, [user_id, ballot_id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Tally the votes on a Ballot
router.get('/:user_id/ballots/:ballot_id/votes', (req, res) => {
	const { user_id, ballot_id } = req.params;
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
		WHERE users.id = ? AND ballots.id = ?
		GROUP BY votes.item_id;
	`
	db.all(sql, [user_id, ballot_id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all users, ballots and the ballots items `
router.get('/ballots/items', (req, res) => {

	const sql = `SELECT 
		users.username as username,
		ballots.title as title,
		ballots.description as description,
		ballots.id as ballot_id,
		items.item as item
	FROM users
	JOIN ballots on users.id = ballots.user_id
	JOIN items on ballots.id = items.ballot_id
	--GROUP BY ballots.title;
	`
	;

	const data: any[] = [];
	db.all(sql, [], (err, rows) => {
		if (err) throw err;


		let prevBallotId = -1;
		let ballotCard: any = {"items": []};
		rows.forEach( row => {
			if (prevBallotId != row.ballot_id) {
				if (prevBallotId !== -1) {
					data.push(ballotCard);
				}
				ballotCard = {"items": []};

				// add row
				ballotCard["ballotId"] = row.ballot_id;
				ballotCard["title"] = row.title;
				ballotCard["desription"] = row.description;
				ballotCard["username"] = row.username;
				ballotCard["items"].push(row.item);

				prevBallotId = row.ballot_id;
			} else {
				ballotCard["ballotId"] = row.ballot_id;
				ballotCard["title"] = row.title;
				ballotCard["desription"] = row.description;
				ballotCard["username"] = row.username;
				ballotCard["items"].push(row.item);

				prevBallotId = row.ballot_id;
			}
		})
		return res.json(data);
	});
	// console.log(data);
});

module.exports = router;