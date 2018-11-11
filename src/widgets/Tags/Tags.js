import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.sass';
import Title from '../../modules/Title/Title';

class Tags extends Component {
  state = {
    tags: [],
  };

  componentDidMount() {
    fetch('http://localhost/wp-json/theme/sidebar/tags')
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
            <li className={styles.tag}><Link to={`${tag.url}#top`}>{tag.name}</Link></li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Tags;
