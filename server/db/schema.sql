DROP TABLE users; 
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	username TEXT NOT NULL
);

DROP TABLE ballot;
CREATE TABLE ballot (
	id INTEGER PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title TEXT NOT NULL,

	FOREIGN KEY (user_id) 
		REFERENCES users(id)
);

DROP TABLE items;
CREATE TABLE items (
	id INTEGER PRIMARY KEY,
	ballot_id INTEGER NOT NULL,
	title TEXT UNIQUE NOT NULL,	
	description TEXT,

	FOREIGN KEY (ballot_id) 
		REFERENCES ballot (id)
);

DROP TABLE votes;
CREATE TABLE votes (
	user_id INTEGER NOT NULL,
	item_id INTEGER NOT NULL,

	FOREIGN KEY (user_id) 
		REFERENCES users (id),
	FOREIGN KEY (item_id)
		REFERENCES items (id)
);
