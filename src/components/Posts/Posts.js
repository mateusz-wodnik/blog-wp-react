import React, { Component } from 'react';
import List from './components/List/List';
import { API_URL } from '../../globals';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
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
