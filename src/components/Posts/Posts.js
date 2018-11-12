import React, { Component } from 'react';
import styles from './Posts.module.sass';
import Preview from './components/Preview/Preview';
import Title from '../../modules/Title/Title';
import List from './components/List/List';
import { API_URL } from '../../globals';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    console.log(process.env)
    const API = `${API_URL}/wp-json/theme/`;
    fetch(`${API}posts`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(console.error);
  }

  render() {
    const { posts } = this.state;
    return <List posts={posts} title="posty" />
  }
}

export default Posts;
