const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbFolder = path.join(__dirname, "data");

// create /data folder if it doesn't exist
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}

const dbPath = path.join(dbFolder, "app.db");

// connect to database
const db = new sqlite3.Database(dbPath);

// run schema (model.sql)
const schema = fs.readFileSync(path.join(__dirname, "model.sql"), "utf-8");

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.log("Error running schema:", err.message);
        } else {
            console.log("Database connected + tables created");
        }
    });
});

module.exports = db;