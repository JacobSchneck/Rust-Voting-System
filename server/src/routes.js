const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();


// Database path
const pathDb = "./db/voting_system.db"; 
console.log(pathDb);

let db = new sqlite3.Database(pathDb, err => {
	if (err) return console.error(err.message);
	console.log("Connected to Database");
});

// API Endpoints
// TODO: Figure that out

//---------------------- GETS ------------------------

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
	`;
	db.all(sql, [], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// Get all items on a ballot 
router.get('/users/:user_id/ballots/:ballot_id', (req, res) => {
	const { user_id, ballot_id } = req.params;
});
