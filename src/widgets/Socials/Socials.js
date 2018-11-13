import React, { Component } from 'react';
import styles from './Socials.module.sass';
import {StoreConsumer} from '../../Store';
import {getSocialsRequest} from './actions';

class Socials extends Component {
  state = {
    social: [],
  };

  componentDidMount() {
    getSocialsRequest(this.props.dispatch)
  }
  render() {
    const { items: social } = this.props.widgetSocials;
    const { className } = this.props;
    return social.map(item => (
      <a
        key={item.ID}
        href={item.url}
        title={item.title}
        aria-label={item.title}
        className={`${styles.social} ${item.title} ${className}`}
      />
    ))
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Socials {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
