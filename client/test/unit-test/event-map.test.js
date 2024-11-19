import React from 'react';
import { render } from '@testing-library/react';
import EventMap from '../../src/components/event-map/event-map';
import mapboxgl from 'mapbox-gl';

// Mock mapbox-gl to avoid rendering an actual map
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    remove: jest.fn()
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn()
  })),
  Popup: jest.fn(() => ({
    setHTML: jest.fn().mockReturnThis()
  })),
  accessToken: ''
}));

describe('EventMap Component', () => {
  const mockEvents = [
    {
      name: 'Event 1',
      _embedded: {
        venues: [
          { name: 'Venue 1', location: { longitude: '10.7522', latitude: '59.9139' } }
        ]
      },
      dates: {
        start: { localDate: '2024-12-01', localTime: '19:00' }
      }
    },
    {
      name: 'Event 2',
      _embedded: {
        venues: [
          { name: 'Venue 2', location: { longitude: '12.4964', latitude: '41.9028' } }
        ]
      },
      dates: {
        start: { localDate: '2024-12-02', localTime: '20:00' }
      }
    }
  ];

  const mockLocation = { longitude: '10.7522', latitude: '59.9139' };

  it('renders map container', () => {
    const { container } = render(<EventMap events={mockEvents} location={mockLocation} />);
    const mapContainer = container.querySelector('.map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  it('initializes map with correct location', () => {
    render(<EventMap events={mockEvents} location={mockLocation} />);
    expect(mapboxgl.Map).toHaveBeenCalledWith({
      container: expect.any(HTMLElement),
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(mockLocation.longitude), parseFloat(mockLocation.latitude)],
      zoom: 8,
      projection: { name: 'mercator' }
    });
  });

  it('handles missing location gracefully', () => {
    console.error = jest.fn(); // Mock console.error
    render(<EventMap events={mockEvents} location={{}} />);
    expect(console.error).toHaveBeenCalledWith('location data error');
  });
});
