import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import FindCare from "../components/FindCare";
import Axios from "../config/axios.setup";
import './FindCarePage.scss'

export class FindCarePage extends Component {
  state = {
    animals: [],
    services: []
  };
  componentDidMount = async () => {
    try {
      let token = localStorage.getItem("ACCESS_TOKEN");
      // console.log("token", token);
      if (token) {
        let userInfo = jwtDecode(token);
        console.log("userInfo", userInfo);
        if (userInfo.role === 'ADMIN') {
          this.props.history.push("/home");
        }
      }

      let resultServices = await Axios.get("/getServicesForGuest");
      let resultAnimals = await Axios.get("/getAnimalsForGuest");
      this.setState({
        animals: resultAnimals.data,
        services: resultServices.data
      });
    } catch { }
  };
  render() {
    return (
      <div className='container-findcare'>
        <FindCare animals={this.state.animals} services={this.state.services} />
      </div>
    );
  }
}

export default FindCarePage;
