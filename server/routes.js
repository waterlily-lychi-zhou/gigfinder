const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers');

// /events
router.get('/events', controller.getEvents)


// /favourites
router.get('/favourites', controller.getFavourites)
router.post('/favourites', controller.addToFavourites)
router.delete('/favourites', controller.deleteFromFavourites)

// /reviews

module.exports = router;