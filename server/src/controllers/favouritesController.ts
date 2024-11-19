const Favourite = require('../models/favourite')

const favouritesController = {
  
  // favourite controller
  getFavourites: async function(req, res) {
    try {
      const favourites = await Favourite.find();
      res.status(200).json(favourites);
      /* console.log('deleted') */
    } catch (error) {
      console.error('Error fetching favourites from database:  ', error);
      res.status(500).json({message: 'Error getting favourites:  ', error})
    }
  },

  addToFavourites: async function(req, res) {
    try {
      const { eventId, eventDetails } = req.body;
      const favourite = new Favourite({ eventId, eventDetails });
      await favourite.save();
      res.status(201).json(favourite);
      // console.log('message added')
    } catch (error) {
      console.error('Error adding favourite:  ', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', error: error.errors });
      }

      res.status(500).json({message: 'Internal server error:  ', error})
    }

    // Check if the error is a Mongoose validation error


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

module.exports = favouritesController;
