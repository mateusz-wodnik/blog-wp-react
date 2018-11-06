import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './App.module.sass';
import MainNavigation from './components/Navigation/MainNavigation';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Featured from './components/Featured/Featured';
import Slider from './components/Slider/Slider';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Header />
        <MainNavigation />
        <Slider />
        <Featured />
      </div>
    );
  }
}

export default App;
