import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Socials.module.sass';

class Socials extends Component {
  state = {
    social: [],
  };

  componentDidMount() {
    fetch('http://localhost/wp-json/theme/menus?slug=social')
      .then(res => res.json())
      .then(social => this.setState({ social }))
      .catch(console.error);
  }
  render() {
    const { social } = this.state;
    const { className } = this.props;
    return social.map(item => <a href={item.url} className={`${styles.social} ${className}`}>{item.title}</a>)
  }
}

export default Socials;
