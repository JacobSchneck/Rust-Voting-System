import express from 'express';
const router = express.Router();
const db = require('../../db/index.js');


//--------------------- GETS -------------------------

// get all ballots
router.get('/', async (req, res) => {
	const sql = "SELECT * from ballots";
	try {
		const { rows } = await db.query(sql, []);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error with retrieving data");
	}
});

// get a specific ballot
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const query = { 
		name: "Get-Specific-Ballot",
		text: "SELECT * FROM ballots WHERE id = $1",
		values: [id]
	}
	try {
		const { rows } = await db.query(query);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error with retrieving data");
	}
});

// tally votes on a ballot
router.get('/:ballot_id/votes', async (req, res) => {
	const { ballot_id } = req.params;
	const sql = `
	select 
		users.username as username,
		ballots.title as ballot,
		items.item as item,
		tally.ct as result
	from (
		select 
			votes.item_id as item_id,
			count(item_id) as ct
		from votes
		group by votes.item_id
	) as tally
	inner join items on items.id = tally.item_id 
	inner join ballots on ballots.id = items.ballot_id
	inner join users on ballots.user_id = users.id
	where ballots.id = $1;
	`;

	const query = {
		name: 'Tally-Votes',
		text: sql,
		values: [ballot_id],
	};

	try {
		const { rows } = await db.query(query);
		res.json(rows);
	} catch (e) {
		console.log(e);
		res.send("Error with retrieving data");
	}
});

//--------------------- POSTS-------------------------

module.exports = router;