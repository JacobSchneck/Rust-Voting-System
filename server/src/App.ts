import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware 
app.use(express.json());
app.use(cors({
	origin: "*",
}));

// Routes 
const users = require('./routes/users');
const ballots = require('./routes/ballots');
const items = require('./routes/items');

app.use("/users", users);
app.use("/ballots", ballots);
// app.use("/items", items);

const db = require('../db/index.js');

//
app.get("/", (req, res) => {
	res.send("Voting System Back End");
});

app.get("/test_db_connection", (req, res) => {
	res.json(db.query("select * from users", []).rows);
});

module.exports = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});