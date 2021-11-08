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
const routes = require('./routes.ts');
app.use("/", routes);

app.get("/", (req: any, res: any) => {
	res.send("Voting System Back End");
});

module.exports = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});