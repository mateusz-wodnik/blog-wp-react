import React, { Component, Fragment } from 'react';
import Content from '../../modules/Content/Content';

class Page extends Component {
  state = {
    page: {},
  };

  componentDidMount() {
    console.log(this.props)
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}pages${this.props.match.path}`)
      .then(res => res.json())
      .then(page => this.setState({ page }))
      .catch(console.error);
  }

  render() {
    const {
      page: { post_content, ...page }
    } = this.state;
    return <Content content={post_content} />
  }
}

export default Page;
