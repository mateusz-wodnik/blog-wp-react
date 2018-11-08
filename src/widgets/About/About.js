import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.sass';
import Title from '../../modules/Title/Title';

class About extends Component {
  state = {
    authorImage: '',
  };

  componentDidMount() {
    fetch('http://localhost/wp-json/theme/settings')
      .then(res => res.json())
      .then(settings => this.setState({ authorImage: settings.author_image }))
      .catch(console.error)
  }
  render() {
    const { authorImage } = this.state;
    return (
      <article className={styles.container}>
        <Title>About</Title>
        <Link to="/o-mnie">
          <img className={styles.image} src={authorImage} alt="avatar"/>
        </Link>
        <p className={styles.text}>Elo elo 350. Jestem Gosia. Twoja najlepsza blogerka modowa ever! </p>
      </article>
    )
  }
}

export default About;
