const express = require('express')
const router = express.Router()
const eventController = require('./controllers/eventsController');
const favouritesController = require('./controllers/favourtiesController');

// /events
router.get('/events', eventController.getEvents)

// /favourites
router.get('/favourites', favouritesController.getFavourites)
router.post('/favourites', favouritesController.addToFavourites)
router.delete('/favourites/:id', favouritesController.deleteFromFavourites)

// /reviews

module.exports = router;