import express from 'express';
import paginatedResults from '../utils/paginatedResults';
const router = express.Router();
const db = require('../../db/index.js');
//--------------------- GETS -------------------------

// get all users
router.get('/', async (req, res: any) => {
	const sql = "SELECT * from users";
	try {
		const { rows } = await db.query(sql, []);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error retrieving data")
	}
});

router.get('/ballots', async (req, res) => {
	const sql = `SELECT 
		users.username as username,
		ballots.title as title,
		ballots.id as ballot_id
	FROM users
	JOIN ballots on users.id = ballots.user_id`;
	try {
		const { rows } = await db.query(sql, []);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error retrieving data")
	}
});

// Get all ballots made by user
router.get('/:user_id/ballots', async (req, res) => {
	const { user_id } = req.params;
	const sql = `
		SELECT 
			users.username AS username,
			ballots.title AS title
		FROM users
		INNER JOIN ballots ON 
			ballots.user_id = users.id
		WHERE users.id = $1;
	`;
	try {
		const { rows } = await db.query(sql, [user_id]);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error retrieving data")
	}
});


// Get all items on a ballot 
router.get('/:user_id/ballots/:ballot_id', async (req, res) => {
	const { user_id, ballot_id } = req.params;
	const sql = `
		SELECT
			users.username AS username,	
			ballots.title as title,
			items.item as item
		FROM items
		INNER JOIN ballots ON  ballots.id = items.ballot_id
		INNER JOIN users ON users.id = ballots.user_id
		WHERE users.id = $1 AND ballots.id = $2
	`;
	const query = {
		name: "Get-All-Items-On-Ballot",
		text: sql,
		values: [user_id, ballot_id],
	}
	try {
		const { rows } = await db.query(query);
		res.json(rows);
	} catch (e) {
		console.log(`Error: ${e}`);
		res.send("Error retrieving data");
	}
});

// Tally the votes on a Ballot
router.get('/:user_id/ballots/:ballot_id/votes', async (req, res) => {
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
		WHERE users.id = $1 AND ballots.id = $2
		GROUP BY votes.item_id;
	`;
	const { user_id, ballot_id } = req.params;
	try {
		const { rows } = await db.query(sql, [user_id, ballot_id]);
		res.json(rows);
	} catch (e) {
		console.log(`Error: ${e}`);
		res.send("Error retrieving data");
	}
});

// Get all users, ballots and the ballots items `
router.get('/ballots/items', async (req, res) => {
	const sql = `
	SELECT 
		users.username as username,
		ballots.title as title,
		ballots.description as description,
		ballots.id as ballot_id,
		items.item as item
	FROM users
	JOIN ballots on users.id = ballots.user_id
	JOIN items on ballots.id = items.ballot_id
	ORDER BY ballots.id ASC;
	--GROUP BY ballots.title;
	`;
	const { rows } = await db.query(sql, []);

	const data: any[] = [];
	let prevBallotId = -1;
	let ballotCard: any = {"items": []};
	rows.forEach((row: any) => {
		if (prevBallotId != row.ballot_id) {
			if (prevBallotId !== -1) {
				data.push(ballotCard)
			}
			ballotCard = {"items": []}

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
	res.json(data);

	// const data: any[] = [];
// 	db.all(sql, [], (err, rows) => {
// 		if (err) throw err;


// 		let prevBallotId = -1;
// 		let ballotCard: any = {"items": []};
// 		rows.forEach( row => {
// 			if (prevBallotId != row.ballot_id) {
// 				if (prevBallotId !== -1) {
// 					data.push(ballotCard);
// 				}
// 				ballotCard = {"items": []};

// 				// add row
// 				ballotCard["ballotId"] = row.ballot_id;
// 				ballotCard["title"] = row.title;
// 				ballotCard["desription"] = row.description;
// 				ballotCard["username"] = row.username;
// 				ballotCard["items"].push(row.item);

// 				prevBallotId = row.ballot_id;
// 			} else {
// 				ballotCard["ballotId"] = row.ballot_id;
// 				ballotCard["title"] = row.title;
// 				ballotCard["desription"] = row.description;
// 				ballotCard["username"] = row.username;
// 				ballotCard["items"].push(row.item);

// 				prevBallotId = row.ballot_id;
// 			}
// 		})
// 		return res.json(data);
	// });
});

//--------------------- POSTS-------------------------

module.exports = router;