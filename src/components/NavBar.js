import React, { Component } from "react";
import "./NavBar.scss";
import Axios from "../config/axios.setup";
import jwtDecode from "jwt-decode";
import { Link, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Icon,
  Modal,
  Input,
  Form,
  InputNumber,
  Drawer,
  Popover,
  Divider,
  Menu,
  Dropdown
} from "antd";
import {
  failLoginNotification,
  successLoginNotification,
  successSignUpNotification,
  failSignUpNotification
} from "../Notification/notification";
import ModalRegister from "./ModalRegister";

export class NavBarComponent extends Component {
  state = {
    isLogin: false,
    isAdmin: false,
    modalRegisterVisible: false,
    modalLoginVisible: false,
    showBar: false,
    confirmDirty: false,
    comparePasswords: false,
    emailRegister: "",
    passwordRegister: "",
    firstname: "",
    lastname: "",
    phone: "",
    idxLocation: "",
    district: [],
    province: [],
    emailLogin: "",
    passwordLogin: "",
    visible: false,
    location: [
      { arrProvince: "Bangkok", arrDistrict: ["Sathon", "Dindaeng"] },
      { arrProvince: "Phuket", arrDistrict: ["Mueang Phuket", "Thalang"] },
      {
        arrProvince: "Chiangmai",
        arrDistrict: ["Mueang Chiangmai", "Chang Phueak"]
      }
    ]
  };

  static getDerivedStateFromProps = (props, state) => {
    // return {favoritecolor: props.favcol };
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role === "ADMIN") {
        return { isAdmin: true };
      }
    }
  };

  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role === "ADMIN") {
        this.setState({
          isAdmin: true
        });
      }
    }
    this.setState({ isLogin: token ? true : false });
    // console.log('isAdmin', this.state.isAdmin);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   this.checkOnline();
  // }

  // checkOnline = () => {
  //   let token = localStorage.getItem("ACCESS_TOKEN");
  //   if (token) {
  //     Axios.post("/isTokenExpired")
  //       .then(result => {
  //         // console.log(result.data);
  //         this.props.history.push("/home");
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }
  // };

  setModalRegisterVisible = modalRegisterVisible => {
    this.setState({
      modalRegisterVisible,
      modalLoginVisible: false
    });
  };

  setModalLoginVisible = modalLoginVisible => {
    this.setState({
      modalLoginVisible
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
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      district: []
    });
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
                .then(result => {
                  console.log(result.data);
                  localStorage.setItem("ACCESS_TOKEN", result.data.token);
                  localStorage.removeItem("defaultTabKey");
                  let token = localStorage.getItem("ACCESS_TOKEN");
                  if (token) {
                    let userInfo = jwtDecode(token);
                    console.log("userInfo", userInfo);
                  }
                  successSignUpNotification();
                  this.props.history.push("/profile");
                  window.location.reload(true);
                })
                .catch(err => {
                  console.error(err, "--------------error-------");
                  // message.error("");
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

  handleLogin = e => {
    e.preventDefault();
    let email = this.state.emailLogin;
    let password = this.state.passwordLogin;
    Axios.post("/login", {
      email,
      password
    })
      .then(result => {
        console.log("result.data", result.data);
        localStorage.setItem("ACCESS_TOKEN", result.data.token);
        localStorage.removeItem("defaultTabKey");
        this.setModalLoginVisible(false);
        this.setState({ isLogin: true });

        // console.log("decode",jwtDecode(result.data.token));
        let user = jwtDecode(result.data.token);
        if (user.role === "ADMIN") {
          this.setState({ isAdmin: true });
          this.props.history.push("/admin");
        } else {
          this.props.history.push("/profile");
        }

        successLoginNotification();
      })
      .catch(err => {
        console.error(err);
        // message.error("");
        this.props.form.resetFields();
        failLoginNotification();
      });
  };

  hadleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("defaultTabKey");
    this.setState({
      isLogin: false,
      isAdmin: false
    });
    this.props.history.push("/home");
    window.location.reload(true);
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  showMenuBar = () => {
    this.setState({
      showBar: !this.state.showBar
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const contentLogin = !this.state.isLogin ? (
      <div>
        <div>
          <Input
            className="input-login"
            onChange={e =>
              this.setState({
                emailLogin: e.target.value
              })
            }
            placeholder="E-mail"
            prefix={<Icon type="user" style={{ color: "#d9d9d9" }} />}
          />
        </div>

        <div>
          <Input
            className="input-login"
            type="password"
            onChange={e =>
              this.setState({
                passwordLogin: e.target.value
              })
            }
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: "#d9d9d9" }} />}
          />
        </div>
        <div>
          <button className="btn-reg" onClick={this.handleLogin}>
            Login
          </button>
        </div>
        <div>
          <Divider className="or">or</Divider>
        </div>
        <button
          className="btn-reg"
          onClick={() => this.setModalRegisterVisible(true)}
        >
          Register
        </button>
      </div>
    ) : (
      <div>
        {this.state.isAdmin ? (
          <a href="/admin">
            <div className="pop-after-login">Admin Console</div>
          </a>
        ) : (
          <a href="/profile">
            <div className="pop-after-login">My Profile</div>
          </a>
        )}

        <div onClick={() => this.hadleLogout()} className="pop-after-login">
          Log Out
        </div>
      </div>
    );
    const menuBar = (
      <Menu>
        <Menu.Item className="hover">
          <a href="/findjobs" className="container-find-bar">
            <div className="find">
              <span className="span">FIND JOBS</span>
            </div>
          </a>
        </Menu.Item>
        <Menu.Item className="hover">
          <a href="/findcare" className="container-find-bar">
            <div className="find">
              <span className="span">FIND CARE</span>
            </div>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Row className="container-navbar">
        {this.state.isAdmin ? (
          <Col xs={4} sm={0}></Col>
        ) : (
          <Col xs={4} sm={0}>
            <Dropdown
              onClick={this.showMenuBar}
              overlay={menuBar}
              trigger={["click"]}
              placement="bottomLeft"
            >
              <div className="each-grid">
                {this.state.showBar ? (
                  <Icon className="icon-hamburger" type="close" />
                ) : (
                  <Icon className="icon-hamburger" type="menu" />
                )}
              </div>
            </Dropdown>
          </Col>
        )}

        <Col xs={16} sm={3}>
          <div className="each-grid">
            <a href="/home" className="link-to-path">
              <img src="https://uppicimg.com/file/DF25QKAk.png" />
            </a>
          </div>
        </Col>

        {this.state.isAdmin ? (
          <Col xs={0} sm={18}></Col>
        ) : (
          <>
            <Col xs={0} sm={6} className="hover">
              <a href="/home" className="each-grid">
                <div className="menu-navbar">
                  <span>HOME</span>
                </div>
              </a>
            </Col>
            <Col xs={0} sm={6} className="hover">
              {this.state.isLogin ? (
                <a
                  href="/profile"
                  className="each-grid"
                  onClick={() => {
                    localStorage.setItem("defaultTabKey", "1");
                  }}
                >
                  <div className="menu-navbar">
                    <span>FIND JOBS</span>
                  </div>
                </a>
              ) : (
                <a
                  href="/findjobs"
                  className="each-grid"
                  onClick={() => {
                    localStorage.setItem("defaultTabKey", "1");
                  }}
                >
                  <div className="menu-navbar">
                    <span>FIND JOBS</span>
                  </div>
                </a>
              )}
            </Col>
            <Col xs={0} sm={6} className="hover">
              {this.state.isLogin ? (
                <a
                  href="/profile"
                  className="each-grid"
                  onClick={() => {
                    localStorage.setItem("defaultTabKey", "2");
                  }}
                >
                  <div className="menu-navbar">
                    <span>FIND CARE</span>
                  </div>
                </a>
              ) : (
                <a
                  href="/findcare"
                  className="each-grid"
                  onClick={() => {
                    localStorage.setItem("defaultTabKey", "2");
                  }}
                >
                  <div className="menu-navbar">
                    <span>FIND CARE</span>
                  </div>
                </a>
              )}
            </Col>
          </>
        )}

        <Col xs={4} sm={3} className="hover">
          <Popover
            placement="bottomRight"
            content={contentLogin}
            trigger="click"
            visible={this.state.modalLoginVisible}
            onVisibleChange={this.setModalLoginVisible}
          >
            <div className="each-grid">
              <div className="menu-navbar">
                <span>
                  <Icon type="user" />
                </span>
              </div>
            </div>
          </Popover>
        </Col>

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
      </Row>
    );
  }
}

const NavBar = Form.create()(NavBarComponent);

export default withRouter(NavBar);
