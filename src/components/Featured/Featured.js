import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Featured.module.sass';

class Featured extends Component {
  state = {
    featured: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts?tag=featured&_embed`)
      .then(res => res.json())
      .then(featured => this.setState({ featured }))
      .catch(console.error);
  }

  render() {
    const { menu } = this.state;
    return (
      <nav className={styles.container}>
        {featured.map(item => <Link to={item.url}>{item.title}</Link>)}
      </nav>
    )
  }
}

export default Featured;
