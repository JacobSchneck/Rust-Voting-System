-- Select all users
SELECT * FROM users;

-- Select all ballots of a specific user
SELECT 
	users.username AS username,
	ballots.title AS ballot
FROM users
INNER JOIN ballots ON users.id = ballots.user_id;

-- Slect all items in a ballot of a specific user
SELECT 
	users.username AS username,
	ballots.title AS ballot,
	items.item AS item
FROM items 
INNER JOIN ballots ON ballots.id = items.ballot_id
INNER JOIN users ON users.id = ballots.user_id;
