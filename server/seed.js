//seed file seeds database with initial data.
import Database from "better-sqlite3";

//constructor function for new database - get the methods.
const db = new Database("database.db");

// executes some sql querys. HAVE TO USE ``. Inside the () put the columns needed.
//PRIMARY KEY for unique identifier. AUTOINCREMENT start at 1 and add 1 for each new record.
db.exec(`CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie TEXT,
  year INTEGER,
  imgURL TEXT
)`);

//INSERT into the table - which columns and the values. REMEMBER THE ‘’ FOR THE STRINGS
db.exec(`
INSERT INTO movies (movie, year, imgURL)
VALUES
('The Matrix', 1999,'https://www.movieposters.com/cdn/shop/files/9fcc8387e9d47ab5af4318d7183f6d2b_23a95582-f6e6-4e07-9490-366380cae365_480x.progressive.jpg?v=1697998648'),
('Ran', 1985, 'https://www.movieposters.com/cdn/shop/products/524570a71a09a3ee64ed72cb490a25d0_0710d2b1-50f5-4fe6-8972-4c4d078ec4b1_480x.progressive.jpg?v=1573618955'),
('Day of the Dead', 2002, 'https://www.movieposters.com/cdn/shop/products/4654d96d3d8675cc0800b0913869c35e_95c55e8b-13ff-4c85-a4c5-ddae2383c8eb_480x.progressive.jpg?v=1573593984')
`);

//add a new column to the existing database
// db.exec(`
// ALTER TABLE movies
// ADD COLUMN genre TEXT`);
