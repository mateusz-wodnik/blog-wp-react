import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Featured.module.sass';

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
      <nav className={styles.container}>
        {featured.map(item => <Post {...item} />)}
      </nav>
    )
  }
}

const Post = ({ post_title, excerpt, post_date, post_modified, url, thumbnail }) => (
  <Link to={url} className={styles.container}>
    <img src={`http://localhost${thumbnail}`} alt="featured"/>
    <h5>{post_title}</h5>
    <p>{excerpt}</p>
    <time>{post_date}</time>
  </Link>
);

export default Featured;
