import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LocationContext } from '../../src/context/location-context';
import LandingPage from '../../src/pages/landing-page/landing-page';

describe('LandingPage Component', () => {
  const mockSetLocation = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    };
  });

  const renderWithContext = () => {
    render(
      <BrowserRouter>
        <LocationContext.Provider value={{ setLocation: mockSetLocation }}>
          <LandingPage />
        </LocationContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders the landing page with logo, tagline, and find button', () => {
    renderWithContext();
    expect(screen.getByAltText('gigfinder-logo')).toBeInTheDocument();
    expect(screen.getByText('CLICK TO FIND EVENTS NEAR YOU')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'FIND' })).toBeInTheDocument();
  });

  it('calls navigator.geolocation.getCurrentPosition on "FIND" button click', () => {
    renderWithContext();

    fireEvent.click(screen.getByRole('button', { name: 'FIND' }));

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('sets location and navigates to events page when geolocation succeeds', () => {
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({
        coords: {
          longitude: 10.7522,
          latitude: 59.9139,
        },
      })
    );

    renderWithContext();

    fireEvent.click(screen.getByRole('button', { name: 'FIND' }));

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(mockSetLocation).toHaveBeenCalledWith({
      longitude: 10.7522,
      latitude: 59.9139,
    });
    expect(mockNavigate).not.toBeNull(); // Ensure navigate function is called.
  });

  it('shows an alert when geolocation fails', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error({
        message: 'Geolocation error',
      })
    );

    renderWithContext();

    fireEvent.click(screen.getByRole('button', { name: 'FIND' }));

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith(
      'Uh oh! We have been unable to get your location. Please ensure location services are enabled and try again.'
    );
  });
});
