import React from 'react';
import './App.css';
import Header from './components/Header';
import Intro from './components/Intro';
import Footer from './components/Footer';

function App() {
  return (
    <div className='app'>
      <Header />
      <Intro />
      <Footer />
    </div>
  );
}

export default App;
