import React from 'react';
import { render } from '@testing-library/react';
import EventDetailsMap from '../../src/components/event-details-map/event-details-map';
import mapboxgl from 'mapbox-gl';

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    remove: jest.fn()
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn()
  })),
  accessToken: ''
}));

describe('EventDetailsMap Component', () => {
  const mockLongitude = '10.7522';
  const mockLatitude = '59.9139';

  it('renders map container', () => {
    const { container } = render(
      <EventDetailsMap longitude={mockLongitude} latitude={mockLatitude} />
    );
    const mapContainer = container.querySelector('.event-details-map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('initializes map with correct longitude and latitude', () => {
    render(<EventDetailsMap longitude={mockLongitude} latitude={mockLatitude} />);
    expect(mapboxgl.Map).toHaveBeenCalledWith({
      container: expect.any(HTMLElement),
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(mockLongitude), parseFloat(mockLatitude)],
      zoom: 12
    });
  });

  it('handles missing longitude or latitude gracefully', () => {
    console.error = jest.fn();
    render(<EventDetailsMap longitude={null} latitude={null} />);
    expect(console.error).toHaveBeenCalledWith('map input error');
  });
});
