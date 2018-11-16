import React, { Component, createRef } from 'react';
import styles from './Slider.module.sass';
import Slide from './components/Slide/Slide';
import {getSliderRequest, setSlider} from './actions';
import {StoreConsumer} from '../../Store';
import handleFetchComponentMount from '../../_utils/handleFetchComponentMount';

class Slider extends Component {
  constructor() {
    super();
    this.slider = createRef();
  }

  state = {
    position: 0,
    order: 0,
  };

  componentDidMount() {
    // getSliderRequest(this.props.dispatch);
    handleFetchComponentMount.bind(this)('slider', setSlider, getSliderRequest)
  }

  handleSlide = (e) => {
    const { order } = this.state;
    const { children } = this.slider.current;
    const { name } = e.target;
    if (name === 'right') {
      const child = children[Math.abs(order % children.length)];
      child.classList.add(styles.transition);
      child.classList.add(styles.moveLeft);
      const transitionCallback = () => {
        child.classList.remove(styles.transition);
        child.classList.remove(styles.moveLeft);
        child.style.order = order + 1;
        child.removeEventListener('transitionend', transitionCallback)
      };
      child.addEventListener('transitionend', transitionCallback);
      this.setState(state => ({ order: state.order + 1 }))
    } else {
      // TODO: Bug to fix. On second backwards loop images is starting to overlap and have wrong order
      const child = children[Math.abs((order - 1) % children.length)];
      child.classList.add(styles.moveLeft);
      child.style.order = order - 1;
      setTimeout(() => {
        child.classList.add(styles.transition);
        child.classList.remove(styles.moveLeft);
      }, 100)
      this.setState(state => ({ order: state.order - 1 }))
    }
  };

  render() {
    const {
      slider: { items, loading, error },
    } = this.props;
    const { position, order } = this.state;
    return (
      <article className={styles.container}>
        <button onClick={this.handleSlide} name="left" className={`${styles.btn} ${styles.left}`}>{"<"}</button>
        <ul ref={this.slider} className={styles.slider} style={{ transform: `translateX(${position}%)` }}>
          {items && items.map(item => <Slide key={item.ID} {...item} />)}
          {loading && <h1>LOADER</h1>}
        </ul>
        <button onClick={this.handleSlide} name="right" className={`${styles.btn} ${styles.right}`}>{">"}</button>
      </article>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Slider {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
