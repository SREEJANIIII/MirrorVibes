const express = require("express");
const router = express.Router();
const axios = require("axios");



router.get("/songs", async (req, res) => {

  const mood = req.query.mood;

  const moodMap = {
    happy: "party",
    sad: "sad",
    calm: "lofi",
    hype: "workout",
    anxious: "relaxing",
    romantic: "romantic",
    energetic: "energetic",
    chill: "chill",
    nostalgic: "nostalgic",
    focused: "focus"
  };

  const keyword = moodMap[mood];

  try {
    const response = await axios.get(
      "https://itunes.apple.com/search",
      {
        params: {
          term: keyword,
          media: "music",
          limit: 10
        }
      }
    );

    const songs = response.data.results;

    const result = songs.map(song => ({
      song: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      preview: song.previewUrl,
      image: song.artworkUrl100
    }));

    res.json(result);

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      error: "Failed to fetch songs"
    });
  }
});

module.exports = router;