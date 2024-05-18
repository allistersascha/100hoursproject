const Artist = require("../models/Artist.js");
const Song = require("/models/Song.js");

module.exports = {
  getArtistPage: async (req, res) => {
    console.log(req.user);
    try {
      const artistItem = await Artist.find({ userId: req.user.id });
      res.render("artistpage.ejs", { artistDash: artistItem, user: req.user });
    } catch (err) {
      console.log(err);
    }
  }, 
//the above should be in an artistPage controller maybe??
  changeArtistName: async (req, res) => {
    try {
      await artistName.update({
        Artist: req.body.artistName, 
        userId: req.user.id,
      });
      console.log("Artist Name changed!");
      res.redirect("/artistdash");
    } catch (err) {
      console.log(err);
    }
  },
 addBio: async (req, res) => {
    try {
      await Artist.create({
        artistBio: req.body.artistBio,
        userId: req.user.id,
      });
      console.log("Artist bio has been added!");
      res.redirect("/artistdash");
    } catch (err) {
      console.log(err);
    }
  },
changeBio: async (req, res) => {
    try {
      await artistBio.update({
        Artist: req.body.artistBio, 
        userId: req.user.id,
      });
      console.log("Artist bio changed!");
      res.redirect("/artistdash");
    } catch (err) {
      console.log(err);
    }
  },
 addArtistImg: async (req, res) => {
    try {
      await Artist.create({
        artistImg: req.body.artistImg,
        userId: req.user.id,
      });
      console.log("Artist image has been added!");
      res.redirect("/artistdash");
    } catch (err) {
      console.log(err);
    }
  },
 changeArtistImg: async (req, res) => {
    try {
      await Artist.update({
        artistImg: req.body.artistImg,
        userId: req.user.id,
      });
      console.log("Artist image has been updated!");
      res.redirect("/artistdash");
    } catch (err) {
      console.log(err);
    }
  }
}