import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.sass';
import Title from '../../modules/Title/Title';

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
      <section className={styles.container}>
        <Title>Tags</Title>
        <ul className={styles.list}>
          {tags.map(tag => (
            <li className={styles.tag}><Link to={tag.link}>{tag.name}</Link></li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Tags;
