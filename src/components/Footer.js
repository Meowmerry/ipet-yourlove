import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <Row type="flex" justify="center" id="container-footer">
        <Col className="footer" xs={23} sm={22}>
          <div className="logo-footer"><a href="/home">
            <img
              alt="ipet"
              src="https://uppicimg.com/file/DF25QKAk.png"
            />
          </a>
          <span className="copyright">
            {" "}
           &nbsp; © Copyright 2020 iPet CodeCamp 4 from iPet Team.
          </span></div>
        </Col>
      </Row>
    );
  }
}
