import React, { Component } from "react";
import { Row, Col, Card } from "antd";
// import { Link } from "react-router-dom";

import "./HomepageInformation.scss";
import { serviceCare } from "../TempStates/serviceCare";
import { howItWorks } from "../TempStates/howItWorks";
import { tips } from "../TempStates/Tips";

export class HomepageInformation extends Component {
  state = {
    serviceCare: [],
    howItWorks: [],
    tips: [],
    Images: []
  };

  componentDidMount = async () => {
    this.setState(state => {
      return { ...state, serviceCare, howItWorks, tips };
    });
  };

  render() {
    return (
      <>
        <Row type="flex" justify="center" className="classRow">
          <Col xs={16} lg={16}>
            <h1 id="service" className="underline--magical">
              SERVICES CARE
                </h1>
          </Col>
        </Row>

        <Row
          type="flex"
          justify="center"
          className="classRow"
          style={{ textAlign: "center", justifyContent: "space-around" }}
        >
          {this.state.serviceCare.map(service => (
            <Col xs={22} lg={6}>
              <h2 className="textH2" key={service.id}>
                {service.title}
              </h2>
              {/* <img src={service.logo} width="50px" height="50px" alt="logo" className="classRow"/> */}
              <p className="classRow">{service.detail}</p>
              <a href="/service">
                <Card className="serviceCard">
                  <img
                    src={service.image}
                    width="100%"
                    height="100%"
                    alt="logo"
                  />
                </Card>
              </a>
            </Col>
          ))}
        </Row>

        <Row type="flex" justify="center" className="classRow">
          <Col xs={22} lg={11}>
            <h1 id="service" className="underline--magical">
              How It Works
            </h1>
            <Row style={{ textAlign: "center", color: "red" }}>
              <h2 className="textH2">
                Services your pet will love. Professionals you can rely on
              </h2>
            </Row>
            {this.state.howItWorks.map(work => (
              <Row type="flex" justify="center" className="classRow">
                <Col xs={24} lg={16}>
                  <img
                    className="class-img "
                    alt="logo"
                    key={work.id}
                    src={work.image}
                    style={{ width: "90%", height: "80%" }}
                  />
                </Col>
                <Col xs={24} lg={8}>
                  <Row type="flex" justify="center">
                    <img
                      alt="logo"
                      className="class-img "
                      src={work.logo}
                      style={{
                        width: "70px",
                        height: "60px",
                        marginTop: "10%"
                      }}
                    />
                  </Row>
                  <Row
                    type="flex"
                    style={{ alignContent: "space-around", textAlign: "left" }}
                  >
                    {work.detail}
                  </Row>
                </Col>
              </Row>
            ))}
          </Col>

          <Col xs={24} lg={12}>
            <h1 id="service" className="underline--magical">
              Tips
            </h1>

            <Row style={{ textAlign: "center", color: "red" }}>
              <h2 className="textH2"> 3 Supplements Your Pet May Be Needing</h2>
            </Row>
            {this.state.tips.map(tip => (
              <Row
                type="flex"
                align='middle'
                // style={{ textAlign: "left" }}
              >
                <Col xs={24} sm={10}>
                  <Row
                    type="flex"
                    align='middle'
                    key={tip.id}
                    style={{ textAlign: "center" }}
                  >
                    <img
                      alt="logo"
                      className="class-img "
                      src={tip.image}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Row>
                </Col>
                <Col xs={24} sm={14}>
                  <Row style={{ textAlign: "left", margin: "6%" }}>
                    <h3>{tip.title}</h3>
                    {tip.detail}
                  </Row>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>

        <Row type="flex" justify="center" className="classRow">
          <Col xs={20} md={10} lg={10}>
            <Row type="flex" justify="center">
              <Col xs={16} md={10} lg={16}>
                <h1 id="service" className="underline--magical">
                  iPet Blog
                </h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ textAlign: "center" }}>
          <Col xs={24} sm={6} >
            <h3 className="classRow">The Pet Guide : The Pet Care Interview</h3>
            <a target="_blank" href="/pet-guide">
              <img
                className="class-img "
                alt="logo"
                src="https://cdn.kinsights.com/cache/c2/71/c27122070f67ac5081ae8d7141182b19.jpg"
              />
            </a>
          </Col>

          <Col xs={24} sm={6}>
            <h3 className="classRow">All about dogs: 101 fun facts</h3>
            <a target="_blank" href="/blog-dog">
              <img
                alt="logo"
                className="class-img "
                src="https://cdn.kinsights.com/cache/1d/7d/1d7da287e60a0d6d2dc6681e8d85991b.jpg"
              />
            </a>
          </Col>

          <Col xs={24} sm={6}>
            <h3 className="classRow">These 9 Great Dog Walking Apps</h3>
            <a target="_blank" href="/blog-app">
              <img
                alt="logo"
                className="class-img"
                src="https://cdn.kinsights.com/cache/8b/43/8b43622c95f41d3148632e53a72345a0.jpg"
              />
            </a>
          </Col>

          <Col xs={24} sm={6}>
            <a target="_blank" href="/blog-job">
              <h3 className="classRow">
                10 Reasons Pet Sitters Love Their Jobs
              </h3>
              <img
                alt="logo"
                className="class-img "
                src="https://cdn.kinsights.com/cache/2a/7e/2a7e168b69bef23d6eecea9695467ac3.jpg"
              />
            </a>
          </Col>
        </Row>
      </>
    );
  }
}

export default HomepageInformation;
