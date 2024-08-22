import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './SoC/styles/main.scss';
import CharsList from './SoC/Chars/CharsList';
import HeaderComponent from './SoC/Header';
import CharPage from './SoC/Chars/CharPage';
import Home from './SoC/Home';
import EventsList from './SoC/Events/EventList';
import EventPage from './SoC/Events/EventPage';
import SkillsList from './SoC/Skills/SkillsList';
import TraitsList from './SoC/Skills/TraitsList';
import EffectsList from './SoC/Skills/EffectsList';
import GearsList from './SoC/Gear/GearsList';
import GearPage from './SoC/Gear/GearPage';
import TarotsList from './SoC/Gear/TarotList';
// import SearchPage from './SoC/Search/SearchPage';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<Home />} exact/>
        <Route path='/chars' element={<CharsList />} exact/>
        <Route path='/chars/:id' element={<CharPage />} exact/>
        <Route path='/skills' element={<SkillsList />} exact/>
        <Route path='/traits' element={<TraitsList />} exact/>
        <Route path='/effects' element={<EffectsList />} exact/>
        <Route path='/gears' element={<GearsList />} exact/>
        <Route path='/gears/:id' element={<GearPage />} exact/>
        <Route path='/tarots' element={<TarotsList />} exact/>
        <Route path='/events' element={<EventsList />} exact/>
        <Route path='/events/:id' element={<EventPage />} exact/>
        {/* <Route path="/search" element={<SearchPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
