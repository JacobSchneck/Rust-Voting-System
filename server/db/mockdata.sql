-- -- Make Users
-- INSERT INTO users ( id, username ) VALUES (1, "Yohan");
-- INSERT INTO users ( id, username ) VALUES (2, "Garry");
-- INSERT INTO users ( id, username ) VALUES (3, "Gertrude");

-- -- Make a ballot 
-- INSERT INTO ballot (id, user_id, title) VALUES (1, 1, "Pets?");

-- -- Make Items on ballot
-- INSERT INTO items (id, ballot_id, title, description) VALUES (1, 1, "Cats", "Evil but fluffy");
-- INSERT INTO items (id, ballot_id, title, description) VALUES (2, 1, "Dogs", "Derpa derp");
-- INSERT INTO items (id, ballot_id, title, description) VALUES (3, 1, "Rabbits", "Vegan fluffs");
-- INSERT INTO items (id, ballot_id, title, description) VALUES (4, 1, "Bird", "Party all night long");

-- -- Vote
-- INSERT INTO votes (user_id, item_id) VALUES (1, 2);
-- INSERT INTO votes (user_id, item_id) VALUES (2, 2);
-- INSERT INTO votes (user_id, item_id) VALUES (3, 1);

-- Query items onto ballot
SELECT
	-- ballot.title, 
	items.title,  
	items.description
FROM items
INNER JOIN ballot ON ballot.id = items.ballot_id;

-- Query to tally votes
SELECT 
	items.title AS title,
	COUNT(item_id) AS tally
FROM votes 
INNER JOIN users ON votes.user_id = users.id
INNER JOIN items ON votes.item_id = items.id
GROUP BY title;
