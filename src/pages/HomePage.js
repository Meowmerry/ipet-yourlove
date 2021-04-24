import React, { Component } from "react";
import HomeImageSlide from "../components/HomeImageSlide";
import HomepageInformation from "../components/HomepageInformation";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeImageSlide />
        <HomepageInformation />
      </div>
    );
  }
}

export default HomePage;
