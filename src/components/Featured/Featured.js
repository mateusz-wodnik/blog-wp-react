import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Featured.module.sass';
import Post from './components/Post';
import Title from '../../modules/Title/Title';
import {API_URL} from '../../globals';

class Featured extends Component {
  state = {
    featured: [],
  };

  componentDidMount() {
    const API = `${API_URL}/wp-json/theme/`;
    fetch(`${API}posts?tag=featured`)
      .then(res => res.json())
      .then(featured => this.setState({ featured }))
      .catch(console.error);
  }

  render() {
    const { featured } = this.state;
    return (
      <section className={styles.container}>
        <Title>Featured</Title>
        <ul className={styles.list}>
          {featured.map(item => <Post {...item} />)}
        </ul>
      </section>
    )
  }
}

export default Featured;
