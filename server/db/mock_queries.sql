-- Select all users
SELECT * FROM users;

-- Select all ballots of a specific user
SELECT 
	users.username AS username,
	ballots.title AS ballot
FROM users
INNER JOIN ballots ON users.id = ballots.user_id;

-- Select all items on a ballot
SELECT 
	ballots.title as title,
	items.item as item
FROM items
INNER JOIN ballots ON ballots.id = items.ballot_id;

-- Select all items in a ballot of a specific user
SELECT 
	users.username AS username,
	ballots.title AS ballot,
	items.item AS item
FROM items 
INNER JOIN ballots ON ballots.id = items.ballot_id
INNER JOIN users ON users.id = ballots.user_id;

-- Tally all votes made on a ballot
-- expected:
-- 	blue: 1 
-- 	red: 2
-- 	green: 0
-- 	pink: 1
-- 	black: 0

SELECT
	users.username AS username,
	ballots.title AS ballot,
	items.item AS item,
	COUNT()
FROM votes
INNER JOIN items ON votes.item_id = items.id
INNER JOIN ballots ON ballots.id = items.ballot_id
INNER JOIN users ON users.id = ballots.user_id
GROUP BY votes.item_id;

-- -- Get ballot by id
-- SELECT * FROM ballots
-- WHERE id = 10;