const db = require("../db");

// GET ALL
exports.getAllArtists = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// GET ONE
exports.getArtistById = (req, res) => {
    db.get(
        "SELECT * FROM artists WHERE artist_id=?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            res.json(row);
        }
    );
};

// CREATE
exports.createArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        `INSERT INTO artists (artist_name, genre, monthly_listeners)
         VALUES (?, ?, ?)`,
        [artist_name, genre, monthly_listeners],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID });
        }
    );
};

// UPDATE
exports.updateArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        `UPDATE artists 
         SET artist_name=?, genre=?, monthly_listeners=? 
         WHERE artist_id=?`,
        [artist_name, genre, monthly_listeners, req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ updated: this.changes });
        }
    );
};

// DELETE
exports.deleteArtist = (req, res) => {
    db.run(
        "DELETE FROM artists WHERE artist_id=?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ deleted: this.changes });
        }
    );
};