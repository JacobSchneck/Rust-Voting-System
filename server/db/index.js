const pkg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = pkg;

const credentials = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: parseInt(process.env.PG_PORT),
};

const pool = new Pool(credentials);

const query = async (text, params) => {
	const start = Date.now();
	const res  = await pool.query(text, params);
	const duration = Date.now() - start;
	console.log('executed query', {text, duration, numRows: res.rowCount, data: res.rows});
	return res
}

const getClient = async () => {
	const client = await pool.connect();
	const query = client.query;
	const release = client.release;
	const timeout = setTimeout(() => {
		console.error('A client has been checked out for more than 5 seconds!');
		console.error(`The last executed query on this client was ${client}`)
	}, 5000);

	client.release = () => {
		clearTimeout(timeout);
		client.query = query;
		client.release = release;
		return release.apply(client);
	}

	return client;
}

const db = {
	query,
	getClient,
};

module.exports = db;