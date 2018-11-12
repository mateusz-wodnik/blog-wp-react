import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.sass';
import Title from '../../modules/Title/Title';
import {API_URL} from '../../globals';

class About extends Component {
  state = {
    title: '',
    text: '',
    image: '',
    url: '',
  };

  componentDidMount() {
    fetch(`${API_URL}/wp-json/theme/sidebar/about`)
      .then(res => res.json())
      .then(about => this.setState({ ...about }))
      .catch(console.error)
  }
  render() {
    const { title, text, image, url } = this.state;
    return (
      <article className={styles.container}>
        <Title>{title}</Title>
        <Link to={url || ''}>
          <img className={styles.image} src={image} alt="author"/>
        </Link>
        <p className={styles.text}>{text}</p>
      </article>
    )
  }
}

export default About;
