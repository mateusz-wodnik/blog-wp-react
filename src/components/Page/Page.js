import React, { Component, Fragment } from 'react';
import Content from '../../modules/Content/Content';
import Header from './Header/Header';
import {API_URL} from '../../globals';

class Page extends Component {
  state = {
    post_content: '',
  };

  componentDidMount() {
    const { match: { params: { slug, category } } } = this.props;
    const type = category ? 'posts' : 'pages';
    this.getPage(slug, type);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { slug, category }, url } } = this.props;
    if(prevProps.match.url !== url) {
      const type = category ? 'posts' : 'pages';
      this.getPage(slug, type);
    }
  }

  getPage = (path, type) => {
    const API = `${API_URL}/wp-json/theme/`;
    fetch(`${API}${type}/${path}`)
      .then(res => res.json())
      .then(page => this.setState({ ...page }))
      .catch(console.error);
    document.querySelector('#top').scrollIntoView({
      behaviour: 'smooth',
      block: 'start',
      inline: 'center',
    });
  };

  render() {
    const { post_content, ...page } = this.state;
    const { match: { params: { category } } } = this.props;
    return (
      <Fragment>
        {category && <Header {...page} />}
        <Content content={post_content} />
      </Fragment>
    )
  }
}

export default Page;
