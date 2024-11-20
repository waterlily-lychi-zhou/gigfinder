import ical, { ICalEventData } from 'ical-generator';

interface Event {
  name: string;
  description?: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  url: string;
  _embedded: {
    venues: {
      address: {
        line1: string;
      };
      city: {
        name: string;
      };
      country: {
        name: string;
      };
    }[];
  };
}

export function generateICSFile(event: Event): void {
  const calendar = ical({ name: 'GigFinder Events' });

  const eventDetails: ICalEventData = {
    start: new Date(event.dates.start.localTime),
    end: new Date(new Date(event.dates.start.localTime).getTime() + 2 * 60 * 60 * 1000), // Add 2 hours to start time
    summary: event.name,
    description: event.description || 'Event at GigFinder',
    location: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}`,
    url: event.url,
  };

  calendar.createEvent(eventDetails);

  // Create a download link for the .ics file
  const blob = new Blob([calendar.toString()], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.name}.ics`;
  link.click();
}
