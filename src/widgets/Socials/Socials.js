import React, { Component } from 'react';
import styles from './Socials.module.sass';
import {StoreConsumer} from '../../Store';
import {getSocialsRequest, setSocials} from './actions';
import handleFetchComponentMount from '../../_utils/handleFetchComponentMount';

class Socials extends Component {
  componentDidMount() {
    // getSocialsRequest(this.props.dispatch)
    handleFetchComponentMount.bind(this)('social', setSocials, getSocialsRequest)
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
