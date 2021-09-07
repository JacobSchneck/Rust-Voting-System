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
	voter_id FORIEGN KEY(voters.id),
	item_id FORIEGN KEY(items.id),
	selected BOOL DEFAULT "t"

