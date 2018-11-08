import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Featured.module.sass';
import Post from './components/Post';

class Featured extends Component {
  state = {
    featured: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts?tag=featured`)
      .then(res => res.json())
      .then(featured => this.setState({ featured }))
      .catch(console.error);
  }

  render() {
    const { featured } = this.state;
    return (
      <ul className={styles.container}>
        {featured.map(item => <Post {...item} />)}
      </ul>
    )
  }
}

export default Featured;
