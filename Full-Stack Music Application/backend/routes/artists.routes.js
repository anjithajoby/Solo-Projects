const express = require("express");
const router = express.Router();

const controller = require("../controllers/artists.controller");

router.get("/", controller.getAllArtists);
router.get("/:id", controller.getArtistById);
router.post("/", controller.createArtist);
router.put("/:id", controller.updateArtist);
router.delete("/:id", controller.deleteArtist);

module.exports = router;