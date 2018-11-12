import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import styles from './Form.module.sass';

class Search extends Component {
  state = {
    opened: false
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.setState(state => ({ opened: !state.opened }));
    const input = e.target.query || e.target.form.query;
    if (input && input.value) this.props.history.push(`/search?s=${input.value}`);
  };

  render() {
    const { opened } = this.state;
    const { className } = this.props;
    return (
      <form onSubmit={this.handleToggle} className={`${styles.container} ${className}`}>
        <input type="text" name="query" className={`${styles.query} ${opened ? styles.opened : ''}`} />
        <button onClick={this.handleToggle} type="button" className={styles.search}>search</button>
      </form>
    )
  }
}

export default withRouter(Search);
