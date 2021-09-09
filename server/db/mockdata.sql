-- Add users into users table
INSERT INTO users (id, username) VALUES (1, "BOB");
INSERT INTO users (id, username) VALUES (2, "Jill");
INSERT INTO users (id, username) VALUES (3, "Cassy");
INSERT INTO users (id, username) VALUES (4, "Dill Pickle");

-- Add ballots to a user
INSERT INTO ballots (id, user_id, title) VALUES (1, 1, "Best Pets");
INSERT INTO ballots (id, user_id, title) VALUES (2, 1, "Best Superhero");
INSERT INTO ballots (id, user_id, title) VALUES (3, 1, "Best Color Power Ranger");
INSERT INTO ballots (id, user_id, title) VALUES (4, 1, "Least favorite bug");

-- Add items to a ballot
INSERT INTO items (id, ballot_id, item) VALUES (1, 3, "Blue");
INSERT INTO items (id, ballot_id, item) VALUES (2, 3, "Red");
INSERT INTO items (id, ballot_id, item) VALUES (3, 3, "Green");
INSERT INTO items (id, ballot_id, item) VALUES (4, 3, "Pink");
INSERT INTO items (id, ballot_id, item) VALUES (5, 3, "Black");

