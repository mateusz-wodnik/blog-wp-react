import React, { Component } from 'react';
import styles from './Socials.module.sass';
import {API_URL} from '../../globals';

class Socials extends Component {
  state = {
    social: [],
  };

  componentDidMount() {
    fetch(`${API_URL}/wp-json/theme/menus/social`)
      .then(res => res.json())
      .then(social => this.setState({ social }))
      .catch(console.error);
  }
  render() {
    const { social } = this.state;
    const { className } = this.props;
    return social.map(item => <a href={item.url} className={`${styles.social} ${item.title} ${className}`} />)
  }
}

export default Socials;
