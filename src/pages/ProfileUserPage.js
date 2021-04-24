import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import ProfileUser from "../components/ProfileUser";


export class ProfileUserPage extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role !== 'USER') {
        this.props.history.push("/home");
      }
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div>
        <ProfileUser />
      </div>
    );
  }
}

export default ProfileUserPage;
