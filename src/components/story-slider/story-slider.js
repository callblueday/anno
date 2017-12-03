import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import './story-slider.scss';

export default class StorySlider extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initSwiper();
  }

  componentWillUnmount() {
    if (this.swiper) {
      typeof this.swiper.destroy === 'function' && this.swiper.destroy();
      this.swiper = null;
    }
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      initialSlide: 0,
      slidesPerView: 'auto',
      slidesPerGroup: 1
    });
  }

  render() {
    return (
      <section className="swiper-container">
        <ul className="swiper-wrapper">
          {
            this.props.list.map((item, index) => {
              let className = `swiper-slide slider-${item.name}`;
              return (
                <li className={className} key={index}>
                  <Link to={'/' + item.name}></Link>
                  <span className="title">{ item.text }</span>
                </li>
              )
            })
          }
        </ul>
      </section>
    );
  };
}
