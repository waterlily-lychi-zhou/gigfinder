const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers');

// /events
router.get('/', controller.getEvents)


// /favourites

// /reviews

module.exports = router;