import { Request, Response } from "express";
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const eventsController = {

  // event controller
  // handle ticketmaster api and format event data
  getEvents: async function(req: Request, res: Response) {
    try {
      const { lat, long } = req.query;
      /* console.log(req.query); */
      const apiKey = process.env.TICKETMASTER_API_KEY;
      /* console.log("Ticketmaster API Key:", process.env.TICKETMASTER_API_KEY); */
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${long}&radius=20&unit=miles&sort=date,asc&classificationName=Music`;
      /* console.log(url) */;
      const response = await fetch(url);
      
      if(!response.ok) {
        const errorText = await response.text();
        console.error("Ticketmaster API Error:", response.status, errorText);
        return res.status(400).send(`Failed to fetch events: ${response.status}`);
      }
      
      const data = await response.json();
      
      // if no events, set to empty array 
      const events = data._embedded ? data._embedded.events : [];

      // for some reason the API returned some past events so these are filtred out here
      const today = new Date();
      const futureEvents = events.filter((event: any) => {
        const eventDate = new Date(event.dates.start.dateTime);
        return eventDate >= today;
      })

      res.status(200).json({ futureEvents });
    } catch (error) {
      console.error('error fetching events:  ', error);
    }
  }
} 

export default eventsController;