import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import styles from './App.module.sass';
import MainNavigation from './components/Navigation/MainNavigation';
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
        <MainNavigation />
        <Switch>
          <Route exact path="/" render={() => (
            <Fragment>
              <Slider />
              <Featured />
              <Posts />
            </Fragment>
          )} />
          <Route exact path="/search/:query" component={Search} />
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

export default App;
