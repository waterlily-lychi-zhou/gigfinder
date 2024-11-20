import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsListPage from './pages/events-list-page/events-list-page';
import LandingPage from './pages/landing-page/landing-page';
import FavouritesPage from './pages/favourites-page/favourites-page';
import EventDetailsPage from './pages/event-details-page/event-details-page';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
