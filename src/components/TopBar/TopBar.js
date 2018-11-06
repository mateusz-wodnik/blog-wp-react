import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.sass';

class TopBar extends Component {
  state = {
    name: '',
    description: '',
    social: [],
  };

  componentDidMount() {
    fetch('http://localhost/wp-json/')
      .then(res => res.json())
      .then(data => {
        const { name, description } = data;
        this.setState({ name, description });
      })
      .catch(console.error);
    fetch('http://localhost/wp-json/theme/menus?slug=social')
      .then(res => res.json())
      .then(social => this.setState({ social }))
      .catch(console.error);
  }

  render() {
    const { name, description, social } = this.state;
    return (
      <article className={styles.container}>
        <p>{description}</p>
        {social.map(item => <a href={item.url}>{item.title}</a>)}
      </article>
    )
  }
}

export default TopBar;
