require('dotenv').config();

export const controllers = {
  
  // event controller
  // handle ticketmaster api and format event data
  getEvents: async function(req, res) {
    try {
      const apiKey = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&radius=20&unit=miles&sort=date,desc`;

      const response = await fetch(url);
      const data = response.json();

      const events = data._embedded ? data._embedded.events : [];
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