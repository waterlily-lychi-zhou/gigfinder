import { Router } from 'express';
import favouritesController from './controllers/favouritesController';
import eventsController from './controllers/eventsController';

const router = Router();

// /events
router.get('/events', eventsController.getEvents)

// /favourites
router.get('/favourites', favouritesController.getFavourites)
router.post('/favourites', favouritesController.addToFavourites)
router.delete('/favourites/:id', favouritesController.deleteFromFavourites)

// /reviews

export default router;