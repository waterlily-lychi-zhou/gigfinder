const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);