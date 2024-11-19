"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favouritesController_1 = __importDefault(require("./controllers/favouritesController"));
const eventsController_1 = __importDefault(require("./controllers/eventsController"));
const router = (0, express_1.Router)();
// /events
router.get('/events', eventsController_1.default.getEvents);
// /favourites
router.get('/favourites', favouritesController_1.default.getFavourites);
router.post('/favourites', favouritesController_1.default.addToFavourites);
router.delete('/favourites/:id', favouritesController_1.default.deleteFromFavourites);
// /reviews
exports.default = router;
