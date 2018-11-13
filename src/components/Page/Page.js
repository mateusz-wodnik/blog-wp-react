import React, { Component } from 'react';
import Content from '../../modules/Content/Content';
import Header from './Header/Header';
import { StoreConsumer } from '../../Store';
import { getPageRequest } from './actions';

class Page extends Component {
  componentDidMount() {
    this.getPage();
  }

  componentDidUpdate(prevProps) {
    const { match: { url } } = this.props;
    if(prevProps.match.url !== url) {
      this.getPage();
    }
  }

  getPage = () => {
    const { dispatch, match: { params: { slug, category } } } = this.props;
    const type = category ? 'posts' : 'pages';
    getPageRequest(dispatch, `${type}/${slug}`);
    this.handleScroll();
  };

  handleScroll = () => {
    document.querySelector('#top').scrollIntoView({
      behaviour: 'smooth',
      block: 'start',
      inline: 'center',
    });
  };

  render() {
    const { post_content, ...page } = this.props.page.item;
    const { match: { params: { category } } } = this.props;
    return (
      <>
        {category && <Header {...page} />}
        <Content content={post_content} />
      </>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Page {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
