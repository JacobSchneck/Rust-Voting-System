import sqlite3 from "sqlite3";
sqlite3.verbose();

async function connectToDb() {
	const pathDb = "./db/testing_db.db"; 
	let db = new sqlite3.Database(pathDb, ( err: any ) => {
		if (err) return console.error(err.message);
		console.log("Connected to Database");
	});
	return db;
}

export default connectToDb;
