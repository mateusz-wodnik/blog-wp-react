import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.sass';
import Title from '../../modules/Title/Title';
import {API_URL} from '../../globals';

class Tags extends Component {
  state = {
    tags: [],
  };

  componentDidMount() {
    fetch(`${API_URL}/wp-json/theme/sidebar/tags`)
      .then(res => res.json())
      .then(widget => this.setState({ ...widget }))
      .catch(console.error)
  }
  render() {
    const { tags, title, text } = this.state;
    return (
      <section className={styles.container}>
        <Title>{title}</Title>
        <p className={styles.text}>{text}</p>
        <ul className={styles.list}>
          {tags.map(tag => (
            <li key={tag.name} className={styles.tag}><Link to={`/search?tag=${tag.slug}`}>{tag.name}</Link></li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Tags;
