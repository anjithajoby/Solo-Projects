DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;


--artists table
CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT NOT NULL,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER
);

--albums table
CREATE TABLE albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT NOT NULL,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

--songs table
CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);



--2 artists
INSERT INTO artists (artist_name, genre, monthly_listeners)
VALUES 
('Gracie Abrams', 'Pop', 18000000),
('beabadoobee', 'Indie', 14000000);

--5 albums
INSERT INTO albums (album_name, release_year, number_of_listens, artist_id)
VALUES
('Good Riddance', 2023, 120000000, 1),
('Minor', 2020, 80000000, 1),
('Beatopia', 2022, 150000000, 2),
('Fake It Flowers', 2020, 110000000, 2),
('Our Extended Play', 2021, 90000000, 2);

--10songs
INSERT INTO songs (song_name, release_year, album_id)
VALUES
('Where do we go now?', 2023, 1),
('I know it won’t work', 2023, 1),
('21', 2020, 2),
('I miss you, I’m sorry', 2020, 2),
('Best', 2022, 3),
('Talk', 2022, 3),
('Care', 2020, 4),
('Worth It', 2020, 4),
('Cologne', 2021, 5),
('Last Day On Earth', 2021, 5);