import React, { Component } from 'react';
import List from '../Posts/components/List/List';

class Search extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    this.handleSearch(search);
  }

  componentDidUpdate(prevProps) {
    const { location: { search } } = this.props;
    if(prevProps.location.search !== search) {
      this.handleSearch(search);
    }
  }

  handleSearch = (query) => {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}search${query}`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(console.error);
  };

  render() {
    const { posts } = this.state;
    return <List posts={posts} title="wyniki wyszukiwania" />
  }
}

export default Search;