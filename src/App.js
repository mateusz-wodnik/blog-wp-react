import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './App.module.sass';
import MainNavigation from './components/Navigation/MainNavigation';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Featured from './components/Featured/Featured';
import Slider from './components/Slider/Slider';
import Posts from './components/Posts/Posts';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <TopBar />
        <Header />
        <MainNavigation />
        <Slider />
        <Featured />
        <Posts />
      </div>
    );
  }
}

export default App;
