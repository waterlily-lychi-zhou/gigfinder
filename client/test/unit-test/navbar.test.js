import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/navbar/navbar';

describe('Navbar Component', () => {
  it('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText('gigfinder-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/gigfinder-logo.png');
  });

  it('renders navigation links correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByText('Home');
    const favouritesLink = screen.getByText('Favourites');
    expect(homeLink).toBeInTheDocument();
    expect(favouritesLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/events');
    expect(favouritesLink).toHaveAttribute('href', '/favourites');
  });
});
