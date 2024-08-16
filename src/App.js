import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './SoC/styles/main.scss';
import CharsList from './SoC/Chars/CharsList';
import HeaderComponent from './SoC/Header';
import CharPage from './SoC/Chars/CharPage';
import Home from './SoC/Home';
import EventsList from './SoC/Events/EventList';
import EventPage from './SoC/Events/EventPage';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<Home />} exact/>
        <Route path='/chars' element={<CharsList />} exact/>
        <Route path='/chars/:id' element={<CharPage />} exact/>
        <Route path='/events' element={<EventsList />} exact/>
        <Route path='/events/:id' element={<EventPage />} exact/>
      </Routes>
    </div>
  );
}

export default App;
