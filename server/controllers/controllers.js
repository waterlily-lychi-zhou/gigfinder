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
      // console.log(data);

      const events = data._embedded ? data._embedded.events : [];
      console.log(events);
      res.status(200).json({ events });
    } catch (error) {
      console.error('error fetching events:  ', error);
    }
  }
  
  // favourite controller
  // handle add/remove favourites
  
  // review controller
  // handle add/remove reviews
}

module.exports = controllers;