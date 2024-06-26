const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
  },
  artistBio: {
    type: String,
  },
  artistImg: {
    img:
        {
        data: Buffer,
        contentType: String
        }
    },
  
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Artist', ArtistSchema)


