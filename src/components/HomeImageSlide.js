import React, { Component } from "react";
import "./HomeImageSlide.scss";
import { Carousel } from "antd";

export class HomeImageSlide extends Component {
  render() {
    return (
      <div className="container-slide-image">
        <Carousel autoplay>
          <div className="each-image">
            <img src="https://uppicimg.com/file/4s7phr2g.jpg" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/w1aYiQnu.png" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/dL1tY2vz.png" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/zsZ8CnDo.png" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/5JV9njOZ.jpg" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/d128NOWm.png" alt="ipet" />
          </div>
          <div className="each-image">
            <img src="https://uppicimg.com/file/WykcSqZ4.png" alt="ipet" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default HomeImageSlide;
