import { sql } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";

db.run(sql`
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT, genre TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS user_favorites (user_id INTEGER NOT NULL, movie_id INTEGER NOT NULL, PRIMARY KEY (user_id, movie_id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (movie_id) REFERENCES movies(id));
`);

await db.insert(schema.movies).values([
  {
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: "action",
    date: 1999,
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "drama",
    date: 1994,
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "drama",
    date: 1972,
  },
  {
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form a violent offshoot of a battle-scarred cyberneticist and five years later fight a strange and unexpected battle.",
    genre: "drama",
    date: 1999,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A meek hobbit named Frodo Baggins inherits a mysterious ring from his uncle Bilbo and sets out on a perilous journey with an unlikable group of eight companions to destroy the ring in the land of Mordor where it was forged.",
    genre: "adventure",
    date: 2001,
  },
]);

await db
  .insert(schema.users)
  .values([{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }]);

await db.insert(schema.userFavorites).values([
  { userId: 1, movieId: 1 },
  { userId: 1, movieId: 2 },
  { userId: 2, movieId: 3 },
  { userId: 2, movieId: 4 },
  { userId: 3, movieId: 5 },
]);

console.log(`Seeding complete.`);
