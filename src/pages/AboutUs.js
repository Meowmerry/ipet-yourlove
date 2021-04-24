import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "../pages/blogPage/Blog.scss";

export default class AboutUs extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role === 'ADMIN') {
        this.props.history.push("/home");
      }
    }
  };
  render() {
    return (
      <>
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
          className="section--make-fetch"
        >
          <h1>iPet OverView</h1>
        </Row>
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
          className="section--make"
        >
          <h2>Our Team</h2>
        </Row>
        <br />
        <Row Images style={{ textAlign: "center" }}>
          <Col xs={24} lg={6}>
            <h3>C-Chalie : iPet </h3>

            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2016/04/11/17/14/dwarf-spitz-1322487_1280.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3>E-Ernie : iPet </h3>

            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3>T-Tigger : iPet</h3>

            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3>H-Hero : iPet</h3>
            <img
              className="class-img-about"
              alt="us"
              src="https://marketplace.canva.com/MADFptfrs-8/1/thumbnail_large/canva-blue-eyes-siberian-husky-puppy-yawning-MADFptfrs-8.jpg"
            />
          </Col>
        </Row>
        <br />

        <Row Images style={{ textAlign: "center" }}>
          <Col xs={24} lg={6}>
            <h3>Milo : iPet</h3>

            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2017/01/20/21/22/kitten-asleep-in-a-pot-1995961__340.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3>B-Bailey :iPet</h3>

            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2016/11/01/23/38/beach-1790049__340.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3>T-Theodore: iPet</h3>
            <img
              className="class-img-about"
              alt="us"
              src="https://awol.junkee.com/wp-content/uploads/2019/05/53222106_365703897613036_6520387052331492915_n.jpg"
            />
          </Col>

          <Col xs={24} lg={6}>
            <h3> K-Kliver: iPet</h3>
            <img
              className="class-img-about"
              alt="us"
              src="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720__340.jpg"
            />
          </Col>
        </Row>
      </>
    );
  }
}
