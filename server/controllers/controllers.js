const Favourite = require('../models/favourite')
require('dotenv').config();


const controllers = {
  
  // event controller
  // handle ticketmaster api and format event data
  getEvents: async function(req, res) {
    try {
      const { lat, long } = req.query;
      const apiKey = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${long}&radius=20&unit=miles&sort=date,asc&classificationName=Music`;

      const response = await fetch(url);
      if(!response.ok) return res.status(400).send('Failed to fetch events')
      
      const data = await response.json();
      const events = data._embedded ? data._embedded.events : [];
      res.status(200).json({ events });
    } catch (error) {
      console.error('error fetching events:  ', error);
    }
  },
  
  // favourite controller
  getFavourites: async function(req, res) {
    try {
      const favourites = await Favourite.find();
      res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourites from database:  ', error);
      res.status(500).json({message: 'Error getting favourites:  ', error})
    }
  },

  addToFavourites: async function(req, res) {
    try {
      const { eventId, eventDetails } = req.body;
      const favourite = new Favourite({ eventId, eventDetails });
      favourite.save();
      res.status(201).json(favourite);
    } catch (error) {
      console.error('Error adding favourite:  ', error);
      res.status(400).json({message: 'Error adding favourite:  ', error})
    }
  },

  deleteFromFavourites: async function(req, res) {
    try {
      const { id } = req.params;
      await Favourite.deleteOne({ eventId: id});
      res.status(200).json({message: 'Successfully removed from Favourites'})
    } catch (error) {
      console.error('Error deleting from database:  ', error);
      res.status(500).json({message: 'Error removing Favourite:  ', error})
    }
  }
  
  // review controller
  // handle add/remove reviews
}

module.exports = controllers;