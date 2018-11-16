import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.sass';
import Title from '../../modules/Title/Title';
import {getAboutRequest, setAbout} from './actions';
import {StoreConsumer} from '../../Store';
import handleFetchComponentMount from '../../_utils/handleFetchComponentMount';

class About extends Component {
  componentDidMount() {
    // getAboutRequest(this.props.dispatch)
    handleFetchComponentMount.bind(this)('about', setAbout, getAboutRequest)
  }
  render() {
    const { title, text, image, url } = this.props.widgetAbout.item;
    return (
      <article className={styles.container}>
        <Title>{title}</Title>
        <Link to={url || ''}>
          <img className={styles.image} src={image} alt="author"/>
        </Link>
        <p className={styles.text}>{text}</p>
      </article>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <About {...props} {...context} ref={ref} />}
  </StoreConsumer>
));

