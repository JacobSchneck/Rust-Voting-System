DROP TABLE users;
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	username TEXT NOT NULL UNIQUE
);

DROP TABLE ballots; 
CREATE TABLE ballots (
	id INTEGER PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	description TEXT,

	FOREIGN KEY (user_id) 
		REFERENCES users (id)
);


DROP TABLE items;
CREATE TABLE items (
	id INTEGER PRIMARY KEY,
	ballot_id INTEGER NOT NULL,
	item TEXT NOT NULL,

	FOREIGN KEY (ballot_id) 
		REFERENCES ballot (id)
);

