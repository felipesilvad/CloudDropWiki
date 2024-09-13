import React from 'react';
import './SoC/styles/main.scss';
import HeaderComponent from './SoC/Header';
import FooterComponent from './SoC/Footer';
import Router from './router';

function App() {
  return (
    <>
      <div className="App">
        <HeaderComponent />
        <Router />
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
