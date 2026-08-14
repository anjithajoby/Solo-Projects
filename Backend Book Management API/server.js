const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'completed'))
    )
`);


app.get("/books", (req, res) => { //Implement a GET endpoint that returns all books as JSON
    const { status } = req.query;

    let query = "SELECT * FROM books";
    let params = [];

    if (status) { //Extend the GET endpoint to support filtering using a query parameter
        query += " WHERE status = ?";
        params.push(status);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.get("/books/:id", (req, res) => { //Implement a GET endpoint that retrieves a book by ID.

    const id = req.params.id;

    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => { //Use a WHERE clause to filter results
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "404 Not Found" }); //Return an appropriate response if the book does not exist (e.g., 404 Not Found).

        }

        res.json(row);
    });
});

//Implement a POST endpoint to add a new book.
app.post("/books", (req, res) => {
    const { title, author, year, status } = req.body; //Read title, author, year, and status from the request body

   
const validStatus = ["to-read", "reading", "completed"]; //Validate that status is one of the allowed values.

    if (!title || !author || !status) {
        return res.status(400).json({ error: "title, author, status required" }); //Validate that title, author, and status are provided.

    }
     
    if (!validStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" }); //Validate that status is one of the allowed values.
    }

    db.run(
        `INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, ?)`,
        [title, author, year, status],      // Use a parameterised SQL query.

        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ id: this.lastID }); //Return the ID of the newly created book.
        }
    );
});

//Implement a PUT endpoint to update an existing book
app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const { title, year, status } = req.body; //Allow updating title, year, and status only.


    const validStatus = ["to-read", "reading", "completed"];

    if (status && !validStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    } //Validate status if it is included in the request.


    db.get("SELECT * FROM books WHERE id = ?", [id], (err, book) => { //Return an appropriate response if the book does not exist.
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!book) {
            return res.status(404).json({ message: "404 Not Found" });
        }

        const updatedTitle = title ?? book.title;
        const updatedYear = year ?? book.year;
        const updatedStatus = status ?? book.status;

        db.run(
            `UPDATE books SET title = ?, year = ?, status = ? WHERE id = ?`, //Use a WHERE clause to target the correct record
            [updatedTitle, updatedYear, updatedStatus, id],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message }); //Extend GET endpoint to support filtering using a query parameter
                }

                res.json({ message: "Book updated successfully" });
            }
        );
    });
});


app.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "404 Not Found" });
        }

        res.json({ message: "Book deleted successfully" });
    });
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});