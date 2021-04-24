import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Icon, Tabs } from "antd";
import style from "./Admin.module.css";
import ViewAdmin from "../components/ViewAdmin";
import PetManagement from "../components/PetManagement";
import ServiceManagement from "../components/ServiceManagement"
import Transaction from "../components/Transaction"
import './Admin.css'

const { TabPane } = Tabs;
// const { Option } = Select;

export class Admin extends Component {

  state = {
    tabPos:'top'
  }

  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role !== 'ADMIN') {
        this.props.history.push("/home");
      }
    }
  };
  render() {
    return (
      <div className={style.containerAdmin}>     
        <Row>
        <Tabs tabPosition={this.state.tabPos} className='adminTab'>
          <TabPane tab="Admin/User" key="1">
            <ViewAdmin />
          </TabPane>
          <TabPane tab="Pet" key="2">
            <PetManagement />
          </TabPane>
          <TabPane tab="Service" key="3">
            <ServiceManagement />
          </TabPane>
          <TabPane tab="History Transaction" key="4">
            <Transaction />
          </TabPane>
        </Tabs>
        </Row>
      </div>
    );
  }
}

export default Admin;
