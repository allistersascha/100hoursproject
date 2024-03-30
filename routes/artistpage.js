const express = require('express')
const router = express.Router()
const pageController = require('../controllers/artistpage') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')



router.get('/', ensureAuth, pageController.getArtistPage)
router.get('/', ensureAuth, pageController.getArtistSongs)

module.exports = router