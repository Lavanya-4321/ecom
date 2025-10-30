const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// ensure data dir exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const db = new Database(path.join(dataDir, 'db.sqlite'));

// initialize schema
db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY,
  productId INTEGER,
  qty INTEGER,
  createdAt TEXT
);
`);

// seed products if empty
const row = db.prepare('SELECT COUNT(*) as c FROM products').get();
if (row.c === 0) {
  const insert = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
  insert.run('Classic Tee', 19.99);
  insert.run('Denim Jacket', 59.5);
  insert.run('Sneakers', 79.99);
  insert.run('Cap', 12.0);
  insert.run('Sunglasses', 29.9);
  insert.run('Backpack', 44.0);
}

module.exports = db;
