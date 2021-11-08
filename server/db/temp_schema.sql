DROP TABLE users;
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	username TEXT NOT NULL UNIQUE
);
ALTER TABLE users ADD email TEXT NOT NULL DEFAULT "null@null.null";

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

DROP TABLE votes;
CREATE TABLE votes (
	item_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,

	FOREIGN KEY (item_id) 
		REFERENCES items (id),

	FOREIGN KEY (user_id)
		REFERENCES users (id)
)
