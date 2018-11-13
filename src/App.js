import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.sass';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Featured from './components/Featured/Featured';
import Slider from './components/Slider/Slider';
import Posts from './components/Posts/Posts';
import About from './widgets/About/About';
import Tags from './widgets/Tags/Tags';
import Footer from './components/Footer/Footer';
import Page from './components/Page/Page';
import Search from './components/Search/Search';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <TopBar />
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/" render={() => (
            <>
              <Slider />
              <Featured />
              <Posts />
            </>
          )} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/category" component={Search} />
          <Route exact path="/:category/:slug" component={Page} />
          <Route exact path="/:slug" component={Page} />
        </Switch>
        <About />
        <Tags />
        <Footer />
      </div>
    );
  }
}

export default hot(module)(App);
