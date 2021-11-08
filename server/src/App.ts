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
app.use("/items", items);

//
app.get("/", (req: any, res: any) => {
	res.send("Voting System Back End");
});

module.exports = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});