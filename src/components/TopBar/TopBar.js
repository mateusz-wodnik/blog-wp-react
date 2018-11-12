import React, { Component } from 'react';
import styles from './TopBar.module.sass';
import SearchForm from '../Search/components/Form/Form';
import Socials from '../../widgets/Socials/Socials';
import {API_URL} from '../../globals';

class TopBar extends Component {
  state = {
    name: '',
    description: '',
  };

  componentDidMount() {
    fetch(`${API_URL}/wp-json/`)
      .then(res => res.json())
      .then(data => {
        const { name, description } = data;
        this.setState({ name, description });
      })
      .catch(console.error);
  }

  render() {
    const { description } = this.state;
    return (
      <article id="top" className={styles.container}>
        <span className={styles.description}>{description}</span>
        <Socials />
        <SearchForm className={styles.search} />
      </article>
    )
  }
}

export default TopBar;
