const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();


// Database path
const pathDb = "./db/testing_db.db"; 
console.log(pathDb);

let db = new sqlite3.Database(pathDb, err => {
	if (err) return console.error(err.message);
	console.log("Connected to Database");
});

// API Endpoints
// TODO: Figure that out

//---------------------- GETS ------------------------

// =========> Users <============

// Get all users
router.get('/users', (req, res) => {
	const sql = "SELECT * from users";
	db.all(sql, [], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

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
	db.all(sql, [user_id], (err, result) => {
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
	db.all(sql, [user_id, ballot_id], (err, result) => {
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
	db.all(sql, [user_id, ballot_id], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});



// =========> Ballots <==========

router.get('/ballots', (req, res) => {
	const sql = "SELECT * from ballots";
	db.all(sql, [], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// router.get('/ballots/:ballot_id')

// =========> Items <============

router.get('/items', (req, res) => {
	const sql = "SELECT * from items";
	db.all(sql, [], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

module.exports = router;
