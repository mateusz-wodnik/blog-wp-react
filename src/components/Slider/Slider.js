import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.sass';
import Slide from './components/Slide/Slide'

class Slider extends Component {
  state = {
    slider: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts?tag=slider`)
      .then(res => res.json())
      .then(slider => this.setState({ slider }))
      .catch(console.error);
  }

  render() {
    const { slider } = this.state;
    return (
      <ul className={styles.container}>
        {slider.map(item => <Slide {...item} />)}
      </ul>
    )
  }
}

export default Slider;
