import React, { Component } from "react";
import Axios from "axios";
import "./CardCare.scss";
import { Card, Collapse, Button, Popconfirm, Popover, Form, Icon, Rate } from "antd";

import ModalRegister from "./ModalRegister";
import jwtDecode from "jwt-decode";
import { withRouter } from "react-router-dom";
import {
  successSignUpNotification,
  failSignUpNotification
} from "../Notification/notification";

class CardCare extends Component {
  state = {
    visible: false,
    isUser: false,
    location: [
      { arrProvince: "Bangkok", arrDistrict: ["Sathon", "Dindaeng"] },
      { arrProvince: "Phuket", arrDistrict: ["Mueang Phuket", "Thalang"] },
      { arrProvince: "Chiangmai", arrDistrict: ["Mueang Chiangmai", "Chang Phueak"] },
    ],
    idxLocation: "",
    district: [],
  };

  componentDidMount = async () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      let userInfo = jwtDecode(token);
      // console.log(userInfo.role);
      this.setState({
        isUser: userInfo.role === "USER" ? true : false
      });
    }
  };

  setModalRegisterVisible = modalRegisterVisible => {
    this.setState({
      modalRegisterVisible,
      visible: false
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleChangePhone = value => {
    this.setState({
      phone: value
    });
  };
  handleProvinceChange = value => {
    // console.log(value);
    this.setState({
      province: this.state.location[value].arrProvince,
      idxLocation: value,
      district: []
    });
    const { setFieldsValue } = this.props.form
    setFieldsValue({
      district: []
    })
  };
  onArrayDistrictChange = value => {
    // console.log(value);
    this.setState({
      district: value
    });
  };
  handleRegister = e => {
    // console.log(e)
    e.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        if (this.state.comparePasswords) {
          const { firstname, lastname, phone, district, province } = this.state;
          let password = this.state.passwordRegister;
          let email = this.state.emailRegister;
          Axios.post("/register", {
            email,
            password,
            firstname,
            lastname,
            phone,
            district,
            province
          })
            .then(result => {
              let email = this.state.emailRegister;
              let password = this.state.passwordRegister;
              console.log("email is:", email, "and password is:", password);
              Axios.post("/login", {
                email,
                password
              })
                .then(async result => {
                  console.log(result.data);
                  localStorage.setItem("ACCESS_TOKEN", result.data.token);
                  let token = localStorage.getItem("ACCESS_TOKEN");
                  if (token) {
                    let userInfo = jwtDecode(token);
                    console.log("userInfo", userInfo);
                  }
                  let numFromTime = parseInt(this.props.fromTime.slice(0, 2));
                  let numToTime = parseInt(this.props.toTime.slice(0, 2));
                  let total =
                    (numToTime - numFromTime) *
                    this.props.job.rate *
                    this.props.amount;
                    this.props.handleHireMatchJobForGuest(
                    total,
                    this.props.job.id
                  );
                  console.log(
                    total,
                    "total is",
                    "and result.data is :",
                    this.props.job
                  );
                  successSignUpNotification();
                  await this.props.history.push("/profile");
                  window.location.reload(true);
                })
                .catch(err => {
                  console.error(err, "--------------error-------");
                  // message.error("");
                  console.error(err);
                  this.props.form.resetFields();
                  failSignUpNotification();
                });
              this.setModalRegisterVisible(false);
            })
            .catch(err => {
              console.error(err.message);
              failSignUpNotification();
            });
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    this.setState({
      comparePasswords: false
    });
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      this.setState({
        comparePasswords: false
      });
      callback("Two passwords is inconsistent.");
    } else {
      this.setState({
        comparePasswords: true
      });
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    this.setState({
      comparePasswords: false
    });
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      this.setState({
        comparePasswords: true
      });
      form.validateFields(["confirm"], {
        force: true
      });
    }
    callback();
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    console.log("isUser", this.state.isUser);

    const { getFieldDecorator } = this.props.form;

    const {
      job,
      choosePets,
      animals,
      chooseService,
      services,
      fromTime,
      toTime,
      handleHireMatchJob,
      amount
    } = this.props;
    const { Panel } = Collapse;
    let numFromTime = parseInt(fromTime.slice(0, 2));
    let numToTime = parseInt(toTime.slice(0, 2));
    let total = (numToTime - numFromTime) * job.rate * amount;
    let deposite = Math.round(total * 0.3);
    let rest = total - deposite;

    const detailchoosePet = animals.find(animal => animal.id === choosePets)
      ? animals.find(animal => animal.id === choosePets).animal
      : "";
    const detailchooseService = services.find(
      service => service.id === chooseService
    )
      ? services.find(service => service.id === chooseService).service
      : "";

    var checkAll = true;

    const contentPopoverUser = (
      <div>
        <div style={{ fontWeight: "bold" }}>
          <Icon
            style={{ color: "#faad14" }}
            type="exclamation-circle"
            theme="filled"
          />
          &nbsp;
          <b>Are you sure you want to hire this service ?</b>
        </div>
        <div className="btn-no-yes">
          <Button onClick={this.hide}>No</Button>
          <Button
            type="primary"
            onClick={ 
              detailchoosePet === "" ||
              detailchooseService === "" ||
              fromTime.length === 0 ||
              toTime.length === 0
                ? (checkAll = false)
                : () => { 
                  handleHireMatchJob(total, job.id)()
                  this.hide()
                }
            }
          >
            Yes
          </Button>
        </div>
        <div>
          {checkAll === false ? (
            <div className="please-choose">
              Please choose
              {detailchoosePet === "" ? (
                <span>
                  <b> Pet</b>,
                </span>
              ) : (
                  ""
                )}
              {detailchooseService === "" ? (
                <span>
                  <b> Service</b>,
                </span>
              ) : (
                  ""
                )}
              {fromTime.length === 0 ? (
                <span>
                  <b> Start Time</b>,
                </span>
              ) : (
                  ""
                )}
              {toTime.length === 0 ? (
                <span>
                  <b> End Time</b>
                </span>
              ) : (
                  ""
                )}
              .
            </div>
          ) : (
              ""
            )}
        </div>
      </div>
    );

    const contentPopoverGuest = (
      <div>
        <div style={{ fontWeight: "bold" }}>
          <Icon
            style={{ color: "#faad14" }}
            type="exclamation-circle"
            theme="filled"
          />
          &nbsp;
          <b>Seem like you don't have an account ?</b>
        </div>
        <div className="btn-no-yes">
          <Button
            type="primary"
            onClick={
              detailchoosePet === "" ||
                detailchooseService === "" ||
                fromTime.length === 0 ||
                toTime.length === 0
                ? (checkAll = false)
                : () => this.setModalRegisterVisible(true)
            }
          // onClick={() => this.setModalRegisterVisible(true)}
          >
            Register and Matching
          </Button>
        </div>
        <div>
          {checkAll === false ? (
            <div className="please-choose">
              Please choose
              {detailchoosePet === "" ? (
                <span>
                  <b> Pet</b>,
                </span>
              ) : (
                  ""
                )}
              {detailchooseService === "" ? (
                <span>
                  <b> Service</b>,
                </span>
              ) : (
                  ""
                )}
              {fromTime.length === 0 ? (
                <span>
                  <b> Start Time</b>,
                </span>
              ) : (
                  ""
                )}
              {toTime.length === 0 ? (
                <span>
                  <b> End Time</b>
                </span>
              ) : (
                  ""
                )}
              .
            </div>
          ) : (
              ""
            )}
        </div>
      </div>
    );

    return (
      <Card
        key={job.id}
        title={
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {job.providerId.firstname + " " + job.providerId.lastname}
              </span>
              <span>{job.date}</span>
            </div>
            <Rate size={"small"} disabled value={job.providerId.star} />
            <div>
              Rate <span style={{ color: "red" }}>{job.rate}</span> Baht/hour
            </div>
          </div>
        }
      >
        <Collapse accordion>
          <Panel header="more Provider detail ..." key={job.id}>
            <div className="container-cardcare">
              <div>
                <div><b>phone:</b> {job.providerId.phone}</div>
                <div><b>district:</b> {job.providerId.district}</div>
                <div><b>province:</b> {job.providerId.province}</div>
                <div><b>address:</b> {job.providerId.address}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ marginBottom: "5px" }}>
                  <span>Prefered pet</span>
                  <div>
                    {job.providerId.takecareofs.map(animal => (
                      <span
                        style={{
                          border: "1px solid",
                          padding: "0px 4px",
                          color: "white",
                          backgroundColor: "#666666",
                          borderRadius: "5px",
                          margin: "0px 0px 0px 5px"
                        }}
                      >
                        {animal.animal.animal}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span>Service</span>
                  <div style={{ border: '0px solid', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {job.providerId.serviceofs.map(service => (
                      <div
                        style={{
                          border: "1px solid",
                          padding: "0px 4px",
                          color: "white",
                          backgroundColor: "#666666",
                          borderRadius: "5px",
                          margin: "0px 0px 5px 0px",
                          width: 'fit-content'
                        }}
                      >
                        {service.service.service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
        <Collapse accordion>
          <Panel header="Jobs information" key={job.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div><b>Pet:</b> {detailchoosePet} x {amount}</div>
                <div><b>Service:</b> {detailchooseService}</div>
                <div>
                  <b>Time:</b> {fromTime ? fromTime : "-"} to{" "}
                  {toTime ? toTime : "-"}
                </div>
                <div><b>Price:</b> total {total ? total : "-"} Baht</div>
                <div>deposite (30%) {deposite ? deposite : "-"} Baht </div>
                <div>pending (70%) {rest ? rest : "-"} Baht</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div></div>

                {this.state.isUser ? (
                  <Popover
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                    placement="rightBottom"
                    content={contentPopoverUser}
                  >
                    <Button>Hire</Button>
                  </Popover>
                ) : (
                    <Popover
                      trigger="click"
                      visible={this.state.visible}
                      onVisibleChange={this.handleVisibleChange}
                      placement="rightBottom"
                      content={contentPopoverGuest}
                    >
                      <Button>Hire</Button>
                    </Popover>
                  )}
                <ModalRegister
                  handleChange={this.handleChange}
                  handleRegister={this.handleRegister}
                  handleChangePhone={this.handleChangePhone}
                  handleConfirmBlur={this.handleConfirmBlur}
                  compareToFirstPassword={this.compareToFirstPassword}
                  validateToNextPassword={this.validateToNextPassword}
                  setModalRegisterVisible={this.setModalRegisterVisible}
                  modalRegisterVisible={this.state.modalRegisterVisible}
                  getFieldDecorator={getFieldDecorator}
                  handleProvinceChange={this.handleProvinceChange}
                  onArrayDistrictChange={this.onArrayDistrictChange}
                  location={this.state.location}
                  idxLocation={this.state.idxLocation}
                  district={this.state.district}
                />
              </div>
            </div>
          </Panel>
        </Collapse>
      </Card>
    );
  }
}
// const CardCare = Form.create()(CardCare)

export default withRouter(Form.create()(CardCare));
