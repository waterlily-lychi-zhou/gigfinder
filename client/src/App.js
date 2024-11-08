import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsListPage from './pages/events-list-page/events-list-page.js';
import LandingPage from './pages/landing-page/landing-page.js';
import FavouritesPage from './pages/favourites-page/favourites-page.js';
import ReviewPage from './pages/review-page/review-page.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/events' element={<EventsListPage/>} />
          {/* <Route path='/favourites' element={<FavouritesPage/>} />
          <Route path='/reviews' element={<ReviewPage/>} /> */}
        </Routes>
      </div>

    </Router>
  ) ;
}

export default App;