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
  DatePicker,
  Collapse
} from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import Axios from "axios";
import PopService from "./PopService";
import CardService from "./CardService";
import FindCare from "./FindCare";
import StepTakeCareOfService from "./StepTakeCareOfService";

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const { Panel } = Collapse;

class ProfileUser extends Component {
  state = {
    rate: null,
    jobs: [],
    jobsFilter: [],
    isjobFilter: false,

    animals: [],
    takeCareOf: [],

    services: [],
    serviceOf: [],

    // === profile === //
    defaultinfo: {},
    location: [
      { Province: "Bangkok", District: ["Sathon", "Dindaeng"] },
      { Province: "Phuket", District: ["Mueang Phuket", "Thalang"] },
      { Province: "Chiangmai", District: ["Mueang Chiangmai", "Chang Phueak"] }
    ],
    districtList: [],
    imgUrl: "",

    // select day by manual //
    startUntilend: [],
    startDate: "",
    endDate: "",
    activeCollapse: [],

    // == tab == //
    defaultTabKey: '',

    // == filter month == //
    lock: "",
    filterMonth: [],
    lockyear: "",
    lockmonth: ""
  };



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

  refreshInfo = () => {
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
  };

  // == life cycle == //
  static getDerivedStateFromProps(props, state) {
    return { defaultTabKey: localStorage.getItem("defaultTabKey") };
  }

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
        })
        .catch(err => {
          console.log(err);
        });

      // === Find jobs === //
      let resultAnimals = await Axios.get("/getAnimals");

      let resultUserTakeCareOfId = [];
      let resultUserTakeCareOf = await Axios.get("/getUserTakeCareOf");
      resultUserTakeCareOf.data.forEach(takecare =>
        resultUserTakeCareOfId.push(takecare.animal_id)
      );

      let resultServices = await Axios.get("/getServices");

      let resultUserServiceOfId = [];
      let resultUserServiceOf = await Axios.get("./getUserServiceOf");
      resultUserServiceOf.data.forEach(service =>
        resultUserServiceOfId.push(service.service_id)
      );

      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");

      this.setState({
        animals: resultAnimals.data,
        services: resultServices.data,
        takeCareOf: resultUserTakeCareOfId,
        serviceOf: resultUserServiceOfId,
        jobs: resultAllMatchJobs.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ================= //

  // ===== step ====== //
  saveService = () => {
    notification.open({
      message: "Save success",
      description: "Your service has been updated",
      icon: <Icon type="smile" style={{ color: "#54b600" }} />
    });
  };
  handleSetTakeCareOfAndService = async () => {
    try {
      let resultSaveTakeCareOf = await Axios.post("/createUserTakeCareOf", {
        takeCareOf: this.state.takeCareOf
      });
      let resultSaveServiceOf = await Axios.post("/createUserServiceOf", {
        serviceOf: this.state.serviceOf
      });
      this.saveService();
    } catch (error) {
      console.log(error);
    }
  };
  handleTickServiceOf = serviceId => e => {
    const { checked } = e.target;
    if (checked) {
      this.setState(
        { serviceOf: [...this.state.serviceOf, serviceId] }
        // ()=>console.log(this.state.takeCareOf)
      );
    } else {
      this.setState(
        {
          serviceOf: this.state.serviceOf.filter(
            service => service !== serviceId
          )
        }
        // ()=>console.log(this.state.takeCareOf)
      );
    }
  };
  handleTickTakeCareOf = animalId => e => {
    const { checked } = e.target;
    if (checked) {
      this.setState(
        { takeCareOf: [...this.state.takeCareOf, animalId] }
        // ()=>console.log(this.state.takeCareOf)
      );
    } else {
      this.setState(
        {
          takeCareOf: this.state.takeCareOf.filter(
            takecare => takecare !== animalId
          )
        }
        // ()=>console.log(this.state.takeCareOf)
      );
    }
  };
  // ================== //

  // ===== status & money ==== //
  finishService = () => {
    notification.open({
      message: "Finished your job!",
      description: "Your job has been finished",
      icon: <Icon type="smile" style={{ color: "#54b600" }} />
    });
  };

  handleAcceptToFinish = targetId => async () => {
    try {
      await Axios.put("/updateStatusAcceptToFinish/" + targetId);
      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({
        jobs: resultAllMatchJobs.data
      });
      this.finishService();
    } catch (error) {
      console.log(error);
    }
  };

  rejectJob = () => {
    notification.open({
      message: "Reject offer job",
      description: "Job has been rejected",
      icon: <Icon type="check" style={{ color: "blue" }} />
    });
  };

  handleCanclePoke = (targetJobId, targetCusId) => async () => {
    try {
      await Axios.delete("/rejectCustomer/" + targetJobId + "/" + targetCusId);
      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({
        jobs: resultAllMatchJobs.data
      });
      this.rejectJob();
    } catch (error) {
      console.log(error);
    }
  };

  transferMoney = (deposite, totalBalance) => {
    console.log(deposite, totalBalance)
    notification.open({
      // message: "Update balance",
      description: `total balace : ${totalBalance} bath`,
      message: <div> Deposite : {deposite} Bath</div>,
      icon: <Icon type="smile" style={{ color: "blue" }} />
    });
  };

  handlePokeToAccept = (
    targetId,
    targetCusId,
    targetCusBalance,
    customer,
    cFirstname,
    cLastname,
    pFirstname,
    pLastname,
    cardId

  ) => async () => {
    // ==== status ====
    console.log(cFirstname)
    console.log(pFirstname)
    console.log(cardId)

    try {
      await Axios.put("/updateStatusPokeToAccept/" + targetId);
      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({
        jobs: resultAllMatchJobs.data
      });

      // ==== balance ====
      let total = customer.price;
      let deposite = Math.round(total * 0.3);

      await Axios.put("/updateBalanceWhenAccept", {
        balanceProvider: this.state.defaultinfo.balance + deposite,
        customer_id: targetCusId,
        balanceCustomer: targetCusBalance - deposite
      });
      this.transferMoney(deposite, this.state.defaultinfo.balance + deposite);
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
        })
        .catch(err => {
          console.log(err);
        });
      let fullCustomer = cFirstname + " " + cLastname
      let fullProvider = pFirstname + " " + pLastname
      await Axios.post("/createtransaction", {
        customerName: fullCustomer,
        providerName: fullProvider,
        cardId: cardId,
      })
    } catch (error) {
      console.log(error);
    }
  };

  handleSetRate = e => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      this.setState({ rate: e.target.value });
    }
  };
  // ================== //

  // ==== Calendar ==== //

  successService = () => {
    notification.open({
      message: "Service success",
      description: "Have a good time",
      icon: <Icon type="smile" style={{ color: "#54b600" }} />
    });
  };

  handleSelectDay = moment => async () => {
    if (!this.state.rate) {
      return;
    }
    try {
      await Axios.post("/createJob", {
        date: moment.format("DD/MM/YYYY"),
        rate: this.state.rate
      });
      this.setState({ rate: "" });

      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({ jobs: resultAllMatchJobs.data });

      this.successService();
    } catch (error) {
      console.log(error);
    }
  };

  handleSelectDayManual = startUntilend => async () => {
    try {
      if (!this.state.rate) {
        return;
      }
      await startUntilend.map(async (isDay, isDayId) => {
        let isDayToMoment = moment(isDay);
        Axios.post("/createJob", {
          date: isDayToMoment.format("DD/MM/YYYY"),
          rate: this.state.rate
        });
        let result = await Axios.get("./allMatchjobsByUserId");
        this.setState({ jobs: result.data });
        if (isDayId === startUntilend.length - 1) {
        }
      });

      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({ jobs: resultAllMatchJobs.data });

      this.successService();

      this.setState({
        startDate: "",
        endDate: "",
        rate: "",
        activeCollapse: []
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteService = () => {
    notification.open({
      message: "Cancle service",
      description: "Your cancle service has been updated",
      icon: <Icon type="warning" style={{ color: "red" }} />
    });
  };
  handleCancleDay = targetId => async () => {
    try {
      await Axios.delete("/deleteJob/" + targetId);
      let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
      this.setState({ jobs: resultAllMatchJobs.data });
      this.deleteService();
    } catch (error) {
      console.log(error);
    }
  };
  dateCellRender = moment => {
    let filterService = jobs => {
      let result = jobs.filter(
        jobDate => jobDate.date.slice(0, 2) == moment.date()
      );
      result = result.filter(
        jobDate => jobDate.date.slice(3, 5) == moment.month() + 1
      );
      result = result.filter(jobDate => jobDate.date.slice(6) == moment.year());
      return result;
    };

    return (
      <div>
        <PopService
          moment={moment}
          handleSelectDay={this.handleSelectDay}
          handleSetRate={this.handleSetRate}
          rate={this.state.rate}
          jobs={this.state.jobs}
          filterService={filterService}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  };

  getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  // =================== //

  handleChange = value => {
    console.log(`selected province ${value}`);
    const provinceObject = this.state.location.find(item => {
      return item.Province === value;
    });
    console.log(provinceObject);
    this.setState({
      districtList: provinceObject.District
    });
    // district
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      district: null
    });
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
  hide = () => {
    this.setState({
      visibleImage: false
    });
  };
  handleVisibleChange = visibleImage => {
    this.setState({ visibleImage });
  };
  handleAddPost = e => {
    e.preventDefault();
    console.log("visable is ", this.state.visible);
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
          this.hide();
          console.log("visable is ", this.state.visible);
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  selectDate = (dates, dateStrings) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);

    let end = dates[0];
    let now = dates[1];

    this.setState({
      startDate: end,
      endDate: now
    });

    let duration = moment.duration(now.diff(end));
    let days = duration.asDays();
    console.log(days);
    let arr = [end.toString()];
    console.log(arr);

    for (let i = 1; i <= days; i++) {
      arr.push(end.add(1, "d").toString());

      console.log(arr);
    }
    end.subtract(days, "d");
    this.setState({ startUntilend: arr });
  };

  onCollapse = key => {
    console.log(key);
    this.setState({
      activeCollapse: key
    });
    // let positionKey = this.state.activeCollapse.indexOf(key);
    // console.log("active", this.state.activeCollapse);
    // console.log("key", key);
    // console.log("indexOf(key)", this.state.activeCollapse.indexOf(key));
    // if (positionKey < 0) {
    //   console.log("NO", this.state.activeCollapse);
    //   this.setState(state => ({
    //     activeCollapse: [...state.activeCollapse, key]
    //   }));
    // } else {
    //   console.log("YES", this.state.activeCollapse);
    //   this.setState(state => ({
    //     activeCollapse: state.activeCollapse.filter(keyItem => keyItem !== key)
    //     // [1, 2, 3, 4, 5] // 1 => [2, 3, 4, 5]
    //   }));
    // }
  };

  getmonthfilter = async (date, dateString) => {

    let resultAllMatchJobs = await Axios.get("./allMatchjobsByUserId");
    await this.setState({ jobs: resultAllMatchJobs.data })

    if (dateString !== "") {

      await this.setState({ lock: dateString })
      let lockyear = await this.state.lock.substring(0, 4)

      let lockmonth = await this.state.lock.substring(5, 7)


      let save = await this.state.jobs.filter(fil => fil.date.substring(3, 5) == lockmonth && fil.date.substring(6, 10) == lockyear)

      await this.setState({ isjobFilter: !this.state.isjobFilter }, () => this.setState({ jobsFilter: save }))
    }

  }




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


    // let lockyear = this.state.lock.substring(0, 4)
    // let lockmonth = this.state.lock.substring(5, 7)
    // console.log(lockyear)
    // console.log(lockmonth)

    // let save = this.state.jobs.filter(fil => fil.date.substring(3, 5 ) == lockmonth && fil.date.substring(6, 10 ) == lockyear )
    // console.log("this save", save)
    // console.log(this.state.jobs)


    return (
      <div id="profile-match-container">
        <div id="profile-container">
          <div>
            <Popover
              visible={this.state.visibleImage}
              onVisibleChange={this.handleVisibleChange}
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
                      <Button type="link">Photo</Button>
                    </Upload>
                  </Row>
                  <Button
                    style={{ marginTop: "10px" }}
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
                className="avatar-profile"
                size={200}
                icon="user"
                src={
                  "http://localhost:8080/" + this.state.defaultinfo.user_image
                }
              />
            </Popover>
            <Card
              className="profile-card"
            >
              <div style={{ marginTop: "0px" }}>
                {" "}
                <Icon type="user" style={{ margin: "3px 10px 0px 0px" }} />
                <div>Name : {this.state.defaultinfo.firstname} {this.state.defaultinfo.lastname}</div>
              </div>
              <div>
                <Icon type="phone" style={{ margin: "3px 10px 0px 0px" }} />
                <div>Phone : {this.state.defaultinfo.phone}</div>
              </div>
              <div>
                <Icon type="home" style={{ margin: "3px 10px 0px 0px" }} />
                <div>Adddress : {this.state.defaultinfo.address}</div>
              </div>
              <div>
                <Icon type="home" style={{ margin: "3px 10px 0px 0px" }} />
                <div>District : {this.state.defaultinfo.district}</div>
              </div>
              <div>
                <Icon type="home" style={{ margin: "3px 10px 0px 0px" }} />
                <div>Province : {this.state.defaultinfo.province}</div>
              </div>
              <div>
                <Icon type="dollar" style={{ margin: "3px 10px 0px 0px" }} />
                <div>Balance : {this.state.defaultinfo.balance}</div>
              </div>
              <div
                style={{
                  margin: "30px 0px 0px",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Button onClick={this.showModal}><Icon type="edit" /> Edit Info</Button>
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
                      ],
                      initialValue: this.state.defaultinfo.province
                    })(
                      <Select
                        // style={{ width: "100%" }}
                        onChange={this.handleChange}
                      >
                        {this.state.location.map((p1, index) => (
                          <Option key="Province" value={p1.Province}>
                            {p1.Province}
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
                      ],
                      initialValue: this.state.defaultinfo.district
                    })(
                      <Select
                      // onChange={()=> {this.setState({districtList:""})}}
                      // style={{ width: "100%" }}
                      // onChange={this.handleChange}
                      >
                        {this.state.districtList.map((item, index) => (
                          <Option key="District" value={item}>
                            {item}
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
          <Tabs
            type="card"
            defaultActiveKey={this.state.defaultTabKey}
          >
            <TabPane
              tab="Find Job"
              key="1"
              style={{ border: "0px solid", padding: "10px" }}
            >
              <div id="top-content-myjob">
                <div id="top-content-myjob-step">
                  <div
                    style={{
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      type="check-circle"
                      theme="filled"
                      style={{ margin: "0px 10px" }}
                    />
                    <div>What service do you offer ?</div>
                  </div>
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
                  className="calendar-frame"
                  style={{
                    width: "100%"
                  }}
                >
                  <div
                    style={{
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      type="schedule"
                      theme="filled"
                      style={{ margin: "0px 10px" }}
                    />
                    <div>Which day do you want to offer your service ?</div>
                  </div>
                  <Collapse
                    activeKey={this.state.activeCollapse}
                    accordion
                    onChange={this.onCollapse}
                  >
                    <Panel
                      header="Select more than one day ... Click here"
                      key="1"
                    >
                      <div
                        className="double-calendar"
                        style={{
                          width: "100%",
                          padding: "10px"
                        }}
                      >
                        <RangePicker
                          size={"small"}
                          value={[this.state.startDate, this.state.endDate]}
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <div>
                            <span>Rate</span>
                            <Input
                              value={this.state.rate}
                              style={{ width: "145px", marginLeft: "10px" }}
                              size="small"
                              placeholder="Input only number"
                              onChange={e => this.handleSetRate(e)}
                            />
                          </div>
                          <Button
                            size="small"
                            onClick={this.handleSelectDayManual(
                              this.state.startUntilend
                            )}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>

                  <Calendar
                    className="job-calendar"
                    dateCellRender={this.dateCellRender}
                    monthCellRender={this.monthCellRender}
                    disabledDate={this.disabledDate}

                  />
                </div>
              </div>

              {/* CARD */}
              <div className='myjob-info-frame' style={{ marginBottom: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Icon type="appstore" theme="filled"
                    style={{ margin: '0px 10px' }}
                  />
                  <span>My job's information</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <MonthPicker className='month-picker' onChange={this.getmonthfilter} placeholder="Select month" />
                </div>
              </div>
              <div
                style={{
                  border: "0px solid",
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
                {
                  this.state.isjobFilter ?
                    this.state.jobsFilter.map(job => (
                      <CardService
                        key={job.id}
                        job={job}
                        animals={this.state.animals}
                        services={this.state.services}
                        handleDoubleSetState={this.handleDoubleSetState}
                        handleCancleDay={this.handleCancleDay}
                        handlePokeToAccept={this.handlePokeToAccept}
                        handleCanclePoke={this.handleCanclePoke}
                        handleAcceptToFinish={this.handleAcceptToFinish}
                      />
                    )) :
                    this.state.jobs.map(job => (
                      <CardService
                        key={job.id}
                        job={job}
                        animals={this.state.animals}
                        services={this.state.services}
                        handleDoubleSetState={this.handleDoubleSetState}
                        handleCancleDay={this.handleCancleDay}
                        handlePokeToAccept={this.handlePokeToAccept}
                        handleCanclePoke={this.handleCanclePoke}
                        handleAcceptToFinish={this.handleAcceptToFinish}
                      />
                    ))
                }
              </div>
            </TabPane>
            <TabPane tab="Find Care" key="2" style={{ padding: "10px" }}>
              <FindCare
                animals={this.state.animals}
                services={this.state.services}
                CusBalance={this.state.defaultinfo.balance}
                refreshInfo={this.refreshInfo}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Form.create({})(ProfileUser);
