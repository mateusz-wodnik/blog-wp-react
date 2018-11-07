import React, { Component } from 'react';
import styles from './Posts.module.sass';
import Preview from './components/Preview/Preview';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(console.error);
  }

  render() {
    const { posts } = this.state;
    return (
      <ul className={styles.container}>
        {posts.map(item => <Preview {...item} />)}
      </ul>
    )
  }
}

export default Posts;
