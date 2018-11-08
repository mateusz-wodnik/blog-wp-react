import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.sass';
import Slide from './components/Slide/Slide';

class Slider extends Component {
  constructor() {
    super();
    this.slider = createRef();
  }

  state = {
    slider: [],
    position: 0,
    order: 0,
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}posts?tag=slider`)
      .then(res => res.json())
      .then(slider => this.setState({ slider }))
      .catch(console.error);
  }

  handleSlide = (e) => {
    const { order } = this.state;
    const { children } = this.slider.current;
    const { name } = e.target;
    console.log(Math.abs(order % children.length), Math.abs((order - 1) % children.length))
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
    const { slider, position } = this.state;
    return (
      <article className={styles.container}>
        <button onClick={this.handleSlide} name="left" className={`${styles.btn} ${styles.left}`}>{"<"}</button>
        <ul ref={this.slider} className={styles.slider} style={{ transform: `translateX(${position}%)` }}>
          {slider.map(item => <Slide {...item} />)}
        </ul>
        <button onClick={this.handleSlide} name="right" className={`${styles.btn} ${styles.right}`}>{">"}</button>
      </article>
    )
  }
}

export default Slider;

// import styles from './Technologies.sass';
// import Technology from './Technology';

// const Technologies = ({technologies}) => (
//   <section className={styles.container}>
//     <h2 className={styles.name}>Technologie</h2>
//     <Slider />
//     <ul id="technologies" className={styles.list}>
//       {technologies.map(technology => (
//         <Technology key={technology.name} technology={technology} />
//       ))}
//     </ul>
//   </section>
// );

class Slid extends React.Component {
  state = {
    order: 0,
    trail: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => this.handleSlider(true), 3000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  handleSlider = (dir) => {
    let {order, trail, change} = this.state
    const element = document.querySelector("#technologies")
    const childrens = element.childNodes
    const handler = dir ? this.forward : this.back

    if(trail === childrens.length ) {
      trail = 0
      order = order + 1
    } else if(trail < 0) {
      order = order - 1
    }
    if (trail === -14) {
      trail = 0
    }

    childrens[trail < 0 ? childrens.length + trail : trail].classList.add(styles.hide)
    childrens[trail < 0 ? childrens.length + trail : trail].addEventListener("transitionend", e => handler(e, dir ? order + 1 : order))
    const value = dir ? trail + 1 : trail - 1
    this.setState({trail: value, order})
  }

  forward = (e, order) => {
    e.target.style.order = order
    setTimeout(() => {
      e.target.classList.remove(styles.hide)
    }, 100)
    e.target.removeEventListener(e.type, this.forward)
  }

  back = (e, order) => {
    e.target.style.order = order
    setTimeout(() => {
      e.target.classList.remove(styles.hide)
    }, 100)
    e.target.removeEventListener(e.type, this.back)
  }

  render() {
    return (
      <div></div>
    )
  }
}
