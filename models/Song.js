const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  songFile: {
    type: Audio,
    required: true,
  },
 
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Song', SongSchema)


