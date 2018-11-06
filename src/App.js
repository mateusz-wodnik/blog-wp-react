import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import styles from './App.module.sass';
import MainNavigation from './components/Navigation/MainNavigation';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Header />
        <MainNavigation />
      </div>
    );
  }
}

export default App;
