const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware 
app.use(express.json());
app.use(cors({
	origin: "*",
}));

// Routes 
const routes = require('./routes');

app.get("/", (req, res) => {
	res.send("Hello World!");
});

module.exports = app.listen(PORT, () => {
	console.log('Listening on port ${PORT}');
});