import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tags.module.sass';
import Title from '../../modules/Title/Title';
import {StoreConsumer} from '../../Store';
import {getTagsRequest} from './actions';

class Tags extends Component {
  componentDidMount() {
    getTagsRequest(this.props.dispatch);
  }

  handleScroll = () => {
    const target = document.querySelector('#header') || document.querySelector('#logo');
    target.scrollIntoView({
      behaviour: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  render() {
    const { tags, title, text } = this.props.widgetTags.item;
    return (
      <section className={styles.container}>
        <Title>{title}</Title>
        <p className={styles.text}>{text}</p>
        <ul className={styles.list}>
          {tags.map(tag => (
            <li onClick={this.handleScroll} key={tag.name} className={styles.tag}><Link to={`/search?tag=${tag.slug}`}>{tag.name}</Link></li>
          ))}
        </ul>
      </section>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Tags {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
