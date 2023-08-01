// src/models/db.js

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DATABASE_URL, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS controles (nombre TEXT UNIQUE, ruta_raiz TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS rutas (id INTEGER PRIMARY KEY, identificador TEXT, ruta TEXT UNIQUE)`
  );
});

module.exports = db;
