import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.sass';

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
        <Link to="/o-mnie">
          <img className={styles.logo} src={authorImage} alt="avatar"/>
        </Link>
      </article>
    )
  }
}

export default About;