import React, { Component } from 'react';
import List from './components/List/List';
import { StoreConsumer } from '../../Store';
import {getPostsRequest} from './actions';

class Posts extends Component {
  componentDidMount() {
    getPostsRequest(this.props.dispatch)
  }

  render() {
    const {
      posts: { items, loading, error }
    } = this.props;
    return loading ? <p>eloeleoleoeo</p> : <List posts={items} title="posty" />
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Posts {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
