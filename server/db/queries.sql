-- -- Select all users
-- SELECT * FROM users;

-- -- Select all ballots of a specific user
-- SELECT 
-- 	users.username AS username,
-- 	ballots.title AS ballot
-- FROM users
-- INNER JOIN ballots ON users.id = ballots.user_id;

-- -- Select all items on a ballot
-- SELECT 
-- 	ballots.title as title,
-- 	items.item as item
-- FROM items
-- INNER JOIN ballots ON ballots.id = items.ballot_id;

-- -- Select all items in a ballot of a specific user
-- SELECT 
-- 	users.username AS username,
-- 	ballots.title AS ballot,
-- 	items.item AS item
-- FROM items 
-- INNER JOIN ballots ON ballots.id = items.ballot_id
-- INNER JOIN users ON users.id = ballots.user_id;

-- Tally all votes made on a ballot
-- expected:
-- 	blue: 1 
-- 	red: 2
-- 	green: 0
-- 	pink: 1
-- 	black: 0


-- SELECT
-- 	-- users.username AS username,
-- 	-- ballots.title AS ballot,
-- 	items.item AS item,
-- 	COUNT(*)
-- FROM votes
-- INNER JOIN items ON votes.item_id = items.id
-- INNER JOIN ballots ON ballots.id = items.ballot_id
-- INNER JOIN users ON users.id = ballots.user_id
-- where ballots.id = 1
-- GROUP BY votes.item_id  ;

select 
	users.username as username,
	ballots.title as ballot,
	items.item as item,
	tally.ct as result
from (
	select 
		votes.item_id as item_id,
		count(item_id) as ct
	from votes
	group by votes.item_id
) as tally
inner join items on items.id = tally.item_id 
inner join ballots on ballots.id = items.ballot_id
inner join users on ballots.user_id = users.id
where ballots.id = 1;


-- select * from ballots where id = 3;

-- -- Get ballot by id
-- SELECT * FROM ballots
-- WHERE id = 10;