import { Request, Response } from "express";
import Favourite, { IFav } from '../models/favourite';

const favouritesController = {
  
  // favourite controller
  getFavourites: async (req: Request, res: Response): Promise<void> => {
    try {
      const favourites = await Favourite.find();
      res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourites from database:  ', error);
      res.status(500).json({message: 'Error getting favourites:  ', error})
    }
  },

  addToFavourites: async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId, eventDetails }: IFav = req.body;
      const favourite = new Favourite({ eventId, eventDetails });
      await favourite.save();
      res.status(201).json(favourite);
    } catch (error: unknown) {
      res.status(400).json({message: 'Error adding favourite:  ', error});
    }

  },

  deleteFromFavourites: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await Favourite.deleteOne({ eventId: id});

      if (result.deletedCount === 0) {
        res.status(404).json({message: "Favourite not found"});
      } else {
        res.status(200).json({message: 'Successfully removed from Favourites'})
      }
    } catch (error: unknown) {
      console.error('Error deleting from database:  ', error);
      res.status(500).json({message: 'Error removing favourite'});
    }
  }
  
  // review controller
  // handle add/remove reviews
}

export default favouritesController;
