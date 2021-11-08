import express from 'express';
const router = express.Router();
import sqlite3 from 'sqlite3';
import connectToDb from '../services/connectToDb';

// // Database path
// const pathDb = "./db/testing_db.db"; 
// console.log(pathDb);

// let db = new sqlite3.Database(pathDb, ( err: any ) => {
// 	if (err) return console.error(err.message);
// 	console.log("Connected to Database");
// });

let db = connectToDb();

// API Endpoints
// TODO: Figure that out

//---------------------- GETS ------------------------

// =========> Users <============

// Get all users
router.get('/users', (req, res) => {
	const sql = "SELECT * from users";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all users and ballots
router.get('/users/ballots', (req, res) => {
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


/*
	{
		ballot_title: string
		description: string
		username: string,
		items: []
	}

*/

// Get all users, ballots and the ballots items `
// router.get('/users/ballots/items', (req, res) => {

// 	const sql = `SELECT 
// 		users.username as username,
// 		ballots.title as title,
// 		ballots.description as description,
// 		ballots.id as ballot_id,
// 		items.item as item
// 	FROM users
// 	JOIN ballots on users.id = ballots.user_id
// 	JOIN items on ballots.id = items.ballot_id
// 	--GROUP BY ballots.title;
// 	`
// 	;

// 	const data = [];
// 	db.all(sql, [], (err, rows) => {
// 		if (err) throw err;


// 		let prevBallotId = -1;
// 		let ballotCard = {"items": []};
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
// 	});
// 	// console.log(data);
// });

// Get all ballots made by user
router.get('/users/:user_id/ballots', (req, res) => {
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
router.get('/users/:user_id/ballots/:ballot_id', (req, res) => {
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
router.get('/users/:user_id/ballots/:ballot_id/votes', (req, res) => {
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



// =========> Ballots <==========

router.get('/ballots', (req, res) => {
	const sql = "SELECT * from ballots";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

router.get('/ballots/:id', (req, res) => {
	const { id } = req.params;
	const sql = "SELECT * FROM ballots WHERE id = ?";
	db.all(sql, [id], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

router.get('/ballots/users', (req, res) => {
	// const { ballot_id } = req.params;
	res.send("HELLO from ballots/users")
	// const sql = `
	// 	SELECT 
	// 		users.username AS username,	
	// 		ballots.title as title
	// 	FROM ballots
	// 	JOIN users ON users.id = ballots.user_id;
	// `;
	// console.log(sql);
	// db.all(sql, [], (err, result) => {
	// 	if (err) throw err;
	// 	console.log(result);
	// 	res.json(result);
	// });
});

// =========> Items <============

router.get('/items', (req, res) => {
	const sql = "SELECT * from items";
	db.all(sql, [], (err: any, result: any) => {
		if (err) throw err;
		res.json(result);
	});
});

module.exports = router;
