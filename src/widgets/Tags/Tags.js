import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.sass';

class Tags extends Component {
  state = {
    tags: [],
  };

  componentDidMount() {
    fetch('http://localhost/wp-json/wp/v2/tags')
      .then(res => res.json())
      .then(tags => this.setState({ tags }))
      .catch(console.error)
  }
  render() {
    const { tags } = this.state;
    return (
      <ul className={styles.container}>
        {tags.map(tag => (
          <li>
            <Link className={styles.tag} to={tag.link}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default Tags;
