import React, { Component } from "react";
import { Icon } from 'antd';
import jwtDecode from "jwt-decode";
import FindJobs from "../components/FindJobs";
import './FindJobsPage.scss'

export class FindJobsPage extends Component {
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
      <div className='container-findjobs'>
        <FindJobs />
      </div>
    );
  }
}

export default FindJobsPage;
