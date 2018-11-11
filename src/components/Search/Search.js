import React, { Component } from 'react';
import List from '../Posts/components/List/List';

class Search extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    const { match: { params: { query } } } = this.props;
    this.handleSearch(query);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { query }, url } } = this.props;
    if(prevProps.match.url !== url) {
      this.handleSearch(query);
    }
  }

  handleSearch = (query) => {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}search/${query}`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(console.error);
  };

  render() {
    const { posts } = this.state;
    return <List posts={posts} />
  }
}

export default Search;