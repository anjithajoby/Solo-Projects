const db = require("../db");

// GET ALL
exports.getAllSongs = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// GET ONE
exports.getSongById = (req, res) => {
    db.get(
        "SELECT * FROM songs WHERE song_id=?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            res.json(row);
        }
    );
};

// CREATE
exports.createSong = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    db.run(
        `INSERT INTO songs (song_name, release_year, album_id)
         VALUES (?, ?, ?)`,
        [song_name, release_year, album_id],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID });
        }
    );
};

// UPDATE
exports.updateSong = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    db.run(
        `UPDATE songs 
         SET song_name=?, release_year=?, album_id=? 
         WHERE song_id=?`,
        [song_name, release_year, album_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ updated: this.changes });
        }
    );
};

// DELETE
exports.deleteSong = (req, res) => {
    db.run(
        "DELETE FROM songs WHERE song_id=?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ deleted: this.changes });
        }
    );
};