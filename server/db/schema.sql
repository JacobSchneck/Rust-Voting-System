-- DROP TABLE users CASCADE;
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
 	email TEXT NOT NULL
	-- privledge TEXT NOT NULL
);

-- DROP TABLE ballots CASCADE; 
CREATE TABLE ballots (
	id INTEGER PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	description TEXT,

	FOREIGN KEY (user_id) 
		REFERENCES users (id)
);


-- DROP TABLE items CASCADE;
CREATE TABLE items (
	id INTEGER PRIMARY KEY,
	ballot_id INTEGER NOT NULL,
	item TEXT NOT NULL,

	FOREIGN KEY (ballot_id) 
		REFERENCES ballots (id)
);

-- DROP TABLE votes CASCADE;
CREATE TABLE votes (
	item_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,

	FOREIGN KEY (item_id) 
		REFERENCES items (id),

	FOREIGN KEY (user_id)
		REFERENCES users (id),
	
	CONSTRAINT UC_Votes UNIQUE (item_id, user_id)
);
