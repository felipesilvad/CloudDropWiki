import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './SoC/styles/main.scss';
import CharsList from './SoC/Chars/CharsList';
import HeaderComponent from './SoC/Header';
import CharPage from './SoC/Chars/CharPage';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path='/chars' element={<CharsList />} exact/>
        <Route path='/chars/:id' element={<CharPage />} exact/>
      </Routes>
    </div>
  );
}

export default App;
