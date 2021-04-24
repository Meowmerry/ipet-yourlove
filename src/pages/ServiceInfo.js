import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "./ServiceInfo.scss";

export default class ServiceInfo extends Component {
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
      <div>
        <Row type="flex" justify="center" className="section--make-fetch">
          <h1>Match iPet! Services</h1>
        </Row>
        <Row
          
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="10%"
        >
          <Col xs={22} lg={11}>
            <Row type="flex" justify="center">
              <img
                alt="ipet"
                className="class-img"
                marginTop="10%"
                src="https://cdn.kinsights.com/cache/11/8b/118b0916ef558705a52e271e5961cbcb.jpg"
              />
            </Row>
          </Col>

          <Col xs={22} lg={11}>
            <Row type="flex" justify="center" className="text-class">
              <Col lg={16}>
                <h2>Choosing pet care that’s right for you and your pet</h2>
              </Col>
            </Row>
            <Row type="flex" justify="center" >
              <Col lg={16}>
                <p >
                  We want to be there whenever our pets need us, but that isn’t
                  always possible. Vacations, work obligations and other life
                  events can take us places our pets can’t, so it’s important to
                  always have a backup pet care plan. From hiring a pet sitter
                  to using a kennel to enlisting a trusted friend or neighbor,
                  there are so many options available right now that making a
                  choice can be overwhelming, especially when there are so many
                  things to consider like cost. To help you decide, we’ve
                  compiled important information about several popular pet care
                  options. Pick which works for you so you’re ready the next
                  time you need it..
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row type="flex" justify="center" justifyContent="space-around" className="section-row">
          <Col xs={22} lg={11}>
          <Row type="flex" justify="center" className="text-class">
              <Col lg={16}>
                <h2>Hire a dog walker or pet sitter</h2>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col lg={16}>
                <p >
                  It’s easy to understand why having someone come in the middle
                  of the day to walk the dog or feed the cat, give them water
                  and keep them company is the obvious first choice for many pet
                  owners. The only variable here is the person caring for them,
                  and many pets and their owners can appreciate that. “In
                  general, dogs and cats thrive on predictability and routine,”
                  says Pia Silvani, director at the ASPCA Behavioral
                  Rehabilitation Center. “The more consistent you can be with
                  your care providers and daily schedule the better your dogs
                  and cats will feel.”
                </p>
              </Col>
            </Row>
          </Col>

          <Col xs={22} lg={11}>
            <Row type="flex" justify="center">
              <img
                alt="ipet"
                className="class-img "
                marginTop="10%"
                src="https://cdn.pixabay.com/photo/2018/09/18/21/08/man-3687274_1280.jpg"
              />
            </Row>
          </Col>
        </Row>

        <Row         
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="10%"
        >
          <Col xs={22} lg={11}>
            <Row type="flex" justify="center">
              <img
                alt="ipet"
                className="class-img "
                marginTop="10%"
                src="http://cdn.homeguide.com/assets/images/content/homeguide-pet-sitter-playing-with-cat.jpg"
              />
            </Row>
          </Col>
          <Col xs={22} lg={11}>
            <Row type="flex" justify="center" className="text-class">
              <Col lg={16}>
                <h2>Take your pet to doggy or kitty day care</h2>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col lg={16}>
                <p >
                  It’s easy to understand why having someone come in the middle
                  of the day to walk the dog or feed the cat, give them water
                  and keep them company is the obvious first choice for many pet
                  owners. The only variable here is the person caring for them,
                  and many pets and their owners can appreciate that. “In
                  general, dogs and cats thrive on predictability and routine,”
                  says Pia Silvani, director at the ASPCA Behavioral
                  Rehabilitation Center. “The more consistent you can be with
                  your care providers and daily schedule the better your dogs
                  and cats will feel.”
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
