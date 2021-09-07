DROP TABLE voters; 
CREATE TABLE voters (
	id INTEGER PRIMARY KEY,
	username TEXT UNIQUE NOT NULL
);

DROP TABLE items;
CREATE TABLE items (
	id INTEGER PRIMARY KEY,
	title TEXT UNIQUE NOT NULL,	
	description TEXT
);

DROP TABLE votes;
CREATE TABLE votes (
	selected BOOL,
	voter_id INTEGER NOT NULL, 
	item_id INTEGER NOT NULL,
	FOREIGN KEY (voter_id) 
		REFERENCES voters (id),
	FOREIGN KEY (item_id) 
		REFERENCES items (id)
);
