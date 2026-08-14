const API = "http://localhost:5000";

/* artists */

async function loadArtists() {
    const res = await fetch(`${API}/artists`);
    const data = await res.json();

    const table = document.getElementById("artistsTable");
    table.innerHTML = "";

    data.forEach(a => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${a.artist_id}</td>
            <td>${a.artist_name}</td>
            <td>${a.genre}</td>
            <td>${a.monthly_listeners}</td>
        `;

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editArtist(a);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteArtist(a.artist_id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        row.appendChild(actions);
        table.appendChild(row);
    });
}

async function addArtist() {
    await fetch(`${API}/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            artist_name: artistName.value,
            genre: artistGenre.value,
            monthly_listeners: artistListeners.value
        })
    });

    loadArtists();
}

async function deleteArtist(id) {
    await fetch(`${API}/artists/${id}`, { method: "DELETE" });
    loadArtists();
}

async function editArtist(a) {
    const name = prompt("Artist Name:", a.artist_name);
    const genre = prompt("Genre:", a.genre);
    const listeners = prompt("Monthly Listeners:", a.monthly_listeners);

    await fetch(`${API}/artists/${a.artist_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            artist_name: name,
            genre: genre,
            monthly_listeners: listeners
        })
    });

    loadArtists();
}

/*albums */

async function loadAlbums() {
    const res = await fetch(`${API}/albums`);
    const data = await res.json();

    const table = document.getElementById("albumsTable");
    table.innerHTML = "";

    data.forEach(a => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${a.album_id}</td>
            <td>${a.album_name}</td>
            <td>${a.release_year}</td>
            <td>${a.number_of_listens}</td>
            <td>${a.artist_id}</td>
        `;

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editAlbum(a);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteAlbum(a.album_id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        row.appendChild(actions);
        table.appendChild(row);
    });
}

async function addAlbum() {
    await fetch(`${API}/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            album_name: albumName.value,
            release_year: albumYear.value,
            number_of_listens: albumListens.value,
            artist_id: albumArtistId.value
        })
    });

    loadAlbums();
}

async function deleteAlbum(id) {
    await fetch(`${API}/albums/${id}`, { method: "DELETE" });
    loadAlbums();
}

async function editAlbum(a) {
    const name = prompt("Album Name:", a.album_name);
    const year = prompt("Release Year:", a.release_year);
    const listens = prompt("Listens:", a.number_of_listens);
    const artist = prompt("Artist ID:", a.artist_id);

    await fetch(`${API}/albums/${a.album_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            album_name: name,
            release_year: year,
            number_of_listens: listens,
            artist_id: artist
        })
    });

    loadAlbums();
}

/*songs*/

async function loadSongs() {
    const res = await fetch(`${API}/songs`);
    const data = await res.json();

    const table = document.getElementById("songsTable");
    table.innerHTML = "";

    data.forEach(s => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${s.song_id}</td>
            <td>${s.song_name}</td>
            <td>${s.release_year}</td>
            <td>${s.album_id}</td>
        `;

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editSong(s);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteSong(s.song_id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        row.appendChild(actions);
        table.appendChild(row);
    });
}

async function addSong() {
    await fetch(`${API}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            song_name: songName.value,
            release_year: songYear.value,
            album_id: songAlbumId.value
        })
    });

    loadSongs();
}

async function deleteSong(id) {
    await fetch(`${API}/songs/${id}`, { method: "DELETE" });
    loadSongs();
}

async function editSong(s) {
    const name = prompt("Song Name:", s.song_name);
    const year = prompt("Release Year:", s.release_year);
    const album = prompt("Album ID:", s.album_id);

    await fetch(`${API}/songs/${s.song_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            song_name: name,
            release_year: year,
            album_id: album
        })
    });

    loadSongs();
}

/*auto load*/

if (document.getElementById("artistsTable")) loadArtists();
if (document.getElementById("albumsTable")) loadAlbums();
if (document.getElementById("songsTable")) loadSongs();