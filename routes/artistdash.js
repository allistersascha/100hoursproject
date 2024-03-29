const express = require('express')
const router = express.Router()
const dashController = require('../controllers/artistdash') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//////Authentification

router.get('/', ensureAuth, dashController.getArtistPage)

router.put('/changeArtistName', dashController.changeArtistName) //actually make this one
router.post('/addArtistImg', dashController.addArtistImg)
router.put('/changeArtistImg', dashController.changeArtistImg) //and this one lmfao

router.post('/addBio', dashController.addBio)
router.put('/changeBio', dashController.changeBio) //and this one

// router.post('/addAlbum', dashController.addAlbum)
// router.delete('/deleteAlbum', dashController.deleteAlbum)

router.post('/addSong', dashController.addSong)
router.delete('/deleteSong', dashController.deleteSong)
// router.put('/addSongToAlbum', dashController.addSongToAlbum)

module.exports = router