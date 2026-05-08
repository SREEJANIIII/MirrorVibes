const express = require("express");
const router = express.Router();
const axios = require("axios");



router.get("/songs", async (req, res) => {

  const mood = req.query.mood;

  const moodMap = {
  happy: "The LIfe Of A Showgirl",
  sad: "Tortured Poets Department",
  calm: "Folklore",
  hype: "Fearless",
  anxious: "Speak Now",
  romantic: "Lover",
  energetic: "Reputation",
  chill: "Midnights",
  nostalgic: "1989",
  focused: "Evermore"
};

const keyword = `Taylor Swift ${moodMap[mood]}`;

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