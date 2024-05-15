const Artist = require("../models/Artist.js");
const Song = require("/models/Song.js");


module.exports = {
  getArtistPage: async (req, res) => {
    console.log(req.user);
    try {
      const artistItem = await Artist.find({ userId: req.user.id });
      res.render("artistpage.ejs", { artistpage: artistItem, user: req.user });
    } catch (err) {
      console.log(err);
    }
  }, 
getArtistSongs: async (req, res) => {
    console.log(req.user);
    try {
      const songItem = await Song.find({ userId: req.user.id });
      res.render("artistpage.ejs", { artistpage: songItem, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

};