import React, { Component } from 'react';
import styles from './Featured.module.sass';
import Post from './components/Post';
import Title from '../../modules/Title/Title';
import {StoreConsumer} from '../../Store';
import {getFeaturedRequest} from './actions';

class Featured extends Component {
  componentDidMount() {
    getFeaturedRequest(this.props.dispatch);
  }

  render() {
    const { items: featured } = this.props.featured;
    return (
      <section className={styles.container}>
        <Title>Featured</Title>
        <ul className={styles.list}>
          {featured.map(item => <Post key={item.ID} {...item} />)}
        </ul>
      </section>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Featured {...props} {...context} ref={ref} />}
  </StoreConsumer>
));

