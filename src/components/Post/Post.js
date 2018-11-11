import React, { Component, Fragment } from 'react';
import styles from './Post.module.sass';
import Header from './components/Header/Header';
import Content from '../../modules/Content/Content';

class Post extends Component {
  state = {
    post: {},
  };

  componentDidMount() {
    console.log(this.props.match.params.slug)
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(post => this.setState({ post }))
      .catch(console.error);
  }

  render() {
    const {
      post: { post_content, ...post }
    } = this.state;
    return (
      <Fragment>
        <Header {...post} />
        <Content content={post_content} />
      </Fragment>
    )
  }
}

export default Post;
