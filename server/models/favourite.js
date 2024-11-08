const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventDetails: { type: Object, required: true}
});

module.exports = mongoose.model('Favourite', favouriteSchema)