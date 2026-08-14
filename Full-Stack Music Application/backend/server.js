const express = require("express"); //Set up a Node.js + Express.js server 
const cors = require("cors");


const db = require("./db");

const artistRoutes = require("./routes/artists.routes");
const albumRoutes = require("./routes/albums.routes");
const songRoutes = require("./routes/songs.routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/songs", songRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});