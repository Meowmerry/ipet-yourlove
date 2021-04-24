import React, { Component } from "react";
import "./ProfileUser.scss";
import {
  Row,
  Tabs,
  Calendar,
  Icon,
  Card,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Popover,
  notification,
  DatePicker
} from "antd";

import moment from "moment";
import "antd/dist/antd.css";
import Axios from "axios";
import PopService from "./PopService";
import CardService from "./CardService";
import FindCare from "./FindCare";
import StepTakeCareOfService from "./StepTakeCareOfService";
import OvernightDate from "./FindCareComponent/OvernightDate";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class userInfo extends Component {

    showModal = () => {
        this.setState({
          visible: true
        });
      };
    
      handleYes = e => {
        console.log(e);
        this.props.form.validateFields((err, value) => {
          if (!err) {
          }
        });
      };
    
    handleOk = e => {
        console.log(e);
        this.props.form.validateFields((err, value) => {
          if (!err) {
            this.setState({
              visible: false
            });
            console.log(value);
            Axios.put("/edit-info", {
              user_image: value.user_image,
              firstname: value.firstname,
              lastname: value.lastname,
              phone: value.phone,
              district: value.district,
              province: value.province,
              address: value.address,
              balance: value.balance
            }).then(() => {
              Axios.get("/getinfo")
                .then(result => {
                  this.setState({
                    defaultinfo: {
                      firstname: result.data.firstname,
                      lastname: result.data.lastname,
                      phone: result.data.phone,
                      email: result.data.email,
                      district: result.data.district,
                      province: result.data.province,
                      address: result.data.address,
                      balance: result.data.balance,
                      user_image: result.data.user_image
                    }
                  });
                  console.log(result.data);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          }
        });
      };
    
    componentDidMount = async () => {
        try {
          // === Profile === //
          Axios.get("/getinfo")
            .then(result => {
              this.setState({
                defaultinfo: {
                  firstname: result.data.firstname,
                  lastname: result.data.lastname,
                  phone: result.data.phone,
                  email: result.data.email,
                  district: result.data.district,
                  province: result.data.province,
                  address: result.data.address,
                  balance: result.data.balance,
                  user_image: result.data.user_image
                }
              });
              // console.log(result.data);
            }).catch(err => {
          console.log(err);
        });
        } catch (error) {
            console.log(error);
          }
        
    }

    handleChange = value => {
        console.log(`selected ${value}`);
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false
        });
      };
    
    handleBeforeUpload = file => {
        this.setState(state => ({
          fileList: [file]
        }));
        return false;
      };
    
    handleRemoveUpload = () => {
        this.setState(state => ({
          fileList: []
        }));
      };
    
    handleAddPost = e => {
        e.preventDefault();
        console.log(this.state.fileList);
        let data = new FormData();
        if (this.state.fileList) {
          data.append("postImage", this.state.fileList[0]);
        }
        data.append("message", this.state.postText);
        Axios.put("/createPost", data)
          .then(result => {
            console.log(result.data.name, "nameis");
            this.handleRemoveUpload();
            Axios.get("/getinfo").then(result => {
              this.setState({ defaultinfo: result.data });
              console.log(result.data, "wtf im getting");
            });
          })
          .catch(err => {
            console.error(err);
          });
      };
      
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            lg: { span: 8 }
          },
          wrapperCol: {
            xs: { span: 24 },
            lg: { span: 16 }
          }
        };
    
    return (
        <div id="profile-match-container">
          <div id="profile-container">
            <div
              type="flex"
              justify="center"
              style={{ width: "100%", height: "100%", textAlign: "center" }}
            >
              {/* <Card
                style={{ width: "100%", height: "100%", textAlign: "center" }}
              > */}
              <Popover
                content={
                  <Form onSubmit={this.handleAddPost}>
                    <Row>
                      {" "}
                      Upload Profile Picture:
                      <Upload
                        onRemove={this.handleRemoveUpload}
                        action="http://localhost:8080/createPost"
                        beforeUpload={this.handleBeforeUpload}
                        fileList={this.state.fileList}
                      >
                        <Button>Photo/Video</Button>
                      </Upload>
                    </Row>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="postButton"
                    >
                      Confirm
                    </Button>
                  </Form>
                }
                title="Profile image"
                trigger="click"
                placement="right"
              >
                <Avatar
                  size={200}
                  icon="user"
                  src={
                    "http://localhost:8080/" + this.state.defaultinfo.user_image
                  }
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px"
                  }}
                />
              </Popover>
              {/* </Card> */}
              <Card  style={{ fontWeight: 'bold', textAlign:"left"  }}>
                <Row>
                  
                <p>
                {/* <Icon type="user"  style={{margin:"5%"}} /> */}
                  Name : {this.state.defaultinfo.firstname}
                  </p>
              
                <p>
                  <Icon type="user"  style={{margin:"5%"}} />
                  Lastname : {this.state.defaultinfo.lastname}
                </p>

                <p>
                  <Icon type="phone"  style={{margin:"5%"}} />
                  Phone : {this.state.defaultinfo.phone}
                </p>
                
                <p>
                  <Icon type="home" style={{margin:"5%"}}   />
                  District : {this.state.defaultinfo.district}
                </p>
                <p>
                  <Icon type="home" style={{margin:"5%"}} />
                  Province : {this.state.defaultinfo.province}
                </p>
                <p >
                  <Icon type="home" style={{margin:"5%"}} />
                  Adddress : {this.state.defaultinfo.address}
                </p>
                <p>
                  <Icon type="dollar" style={{margin:"5%"}} />
                  Balance : {this.state.defaultinfo.balance}
                </p> 
                </Row>
                  <div style={{margin:'15',textAlign:'center'}} >
                <Button  onClick={this.showModal}>Edit Info</Button>
                </div>
              </Card>

              <div>
                <Modal
                  title="Edit User information"
                  
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  
                  <Form
                    onSubmit={this.handleSubmit}
                    {...formItemLayout}
                    className="edit-form"
                  >
                    <Form.Item label="Firstname">
                      {getFieldDecorator("firstname", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your firstname!"
                          }
                        ],
                        initialValue: this.state.defaultinfo.firstname
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="name"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="name"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="Lastname">
                      {getFieldDecorator("lastname", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your lastname!"
                          }
                        ],
                        initialValue: this.state.defaultinfo.lastname
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="lastname"
                          placeholder="lastname"
                        />
                      )}
                    </Form.Item>
    
                    <Form.Item label="Phone">
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your Phone number!"
                          }
                        ],
                        initialValue: this.state.defaultinfo.phone
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="phone"
                          placeholder="phone"
                        />
                      )}
                    </Form.Item>
    
                    <Form.Item label="Address">
                      {getFieldDecorator("address", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your address!"
                          }
                        ],
                        initialValue: this.state.defaultinfo.address
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="address"
                          placeholder="address"
                        />
                      )}
                    </Form.Item>
    
                    <Form.Item label="Balance">
                      {getFieldDecorator("balance", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your balance!"
                          }
                        ],
                        initialValue: this.state.defaultinfo.balance
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="balance"
                          placeholder="balance"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="Province">
                      {getFieldDecorator("province", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your province!"
                          }
                        ]
                      })(
                        <Select
                          // style={{ width: "100%" }}
                          onChange={this.handleChange}
                        >
                          {this.state.location.map(p1 => (
                            <Option key={p1.id} value={p1.province}>
                              {p1.province}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
    
                    <Form.Item label="District">
                      {getFieldDecorator("district", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your district!"
                          }
                        ]
                      })(
                        <Select
                          // style={{ width: "100%" }}
                          onChange={this.handleChange}
                        >
                          {this.state.location.map(p1 => (
                            <Option key={p1.id} value={p1.district}>
                              {p1.district}
                            </Option>
                          ))}
                        </Select>
                      )}
                      {/* <Select style={{ width: 120 }} onChange={this.handleChange}>
                        {this.state.location.map(p1 => (
                          <Option key={p1.id} value={p1.province}>
                            {p1.province}
                          </Option>
                        ))}
                      </Select>
                      <Select style={{ width: 120 }} onChange={this.handleChange}>
                        {this.state.location.map(p1 => (
                          <Option key={p1.id} value={p1.district}>
                            {p1.district}
                          </Option>
                        ))}
                      </Select> */}
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
    
          <div id="job-container">
            <Tabs type="card" style={{ border: "0px solid" }}>
              <TabPane
                tab="My Jobs"
                key="1"
                style={{ border: "0px solid", padding: "10px" }}
              >
                <div id="top-content-myjob">
                  <div id="top-content-myjob-step">
                    <StepTakeCareOfService
                      animals={this.state.animals}
                      services={this.state.services}
                      takeCareOf={this.state.takeCareOf}
                      serviceOf={this.state.serviceOf}
                      handleTickTakeCareOf={this.handleTickTakeCareOf}
                      handleTickServiceOf={this.handleTickServiceOf}
                      handleSetTakeCareOfAndService={
                        this.handleSetTakeCareOfAndService
                      }
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid #D9D9D9",
                      borderRadius: 4
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingTop: "10px"
                      }}
                    >
                      <RangePicker
                        size={"small"}
                        style={{ width: "250px" }}
                        ranges={{
                          Today: [moment(), moment()],
                          "This Month": [
                            moment().startOf("month"),
                            moment().endOf("month")
                          ]
                        }}
                        showTimeformat="YYYY/MM/DD HH:mm:ss"
                        onChange={this.selectDate}
                      />
                      <span style={{ display: "flex" }}>
                        <p>rate</p>
                        <Input
                          style={{ width: "145px" }}
                          size="small"
                          placeholder="Input only number"
                          onChange={e =>
                            this.setState({ rateManual: e.target.value })
                          }
                        />
                      </span>
                      <Button
                        size="small"
                        onClick={this.handleSelectDayManual(
                          this.state.startUntilend
                        )}
                      >
                        Submit
                      </Button>
                    </div>
                    <hr />
                    <Calendar
                      className="job-calendar"
                      dateCellRender={this.dateCellRender}
                      monthCellRender={this.monthCellRender}
                    />
                  </div>
                </div>
    
                {/* CARD */}
                <div
                  style={{
                    border: "0px solid",
                    padding: "10px 30px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                  }}
                >
                  {this.state.jobs.map(job => (
                    <CardService
                      key={job.id}
                      job={job}
                      handleDoubleSetState={this.handleDoubleSetState}
                      handleCancleDay={this.handleCancleDay}
                      handlePokeToAccept={this.handlePokeToAccept}
                      handleCanclePoke={this.handleCanclePoke}
                      handleAcceptToFinish={this.handleAcceptToFinish}
                    />
                  ))}
                </div>
              </TabPane>
              <TabPane tab="Hire" key="2" style={{ padding: "10px" }}>
                <FindCare
                  animals={this.state.animals}
                  services={this.state.services}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      );
    }
    
}


export default Form.create({})(userInfo);
