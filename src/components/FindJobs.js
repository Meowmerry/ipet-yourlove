import React, { Component } from "react";
import "./FindJobs.scss";
import { Steps, Button, message, Checkbox, Calendar, Input, Form, Modal, InputNumber, notification, Icon } from "antd";
import PopService from './PopService'
import jwtDecode from "jwt-decode";
import { Link, withRouter } from "react-router-dom";
import {
  successSignUpNotification,
  failSignUpNotification
} from "../Notification/notification";
import ModalRegister from "./ModalRegister";
import moment from "moment";
import Axios from "axios";

export class FindJobsComponent extends Component {
  state = {
    current: 0,
    animals: [],
    takeCareOf: [],

    services: [],
    serviceOf: [],
    rate: null,
    jobs: [],
    location: [
      { arrProvince: "Bangkok", arrDistrict: ["Sathon", "Dindaeng"] },
      { arrProvince: "Phuket", arrDistrict: ["Mueang Phuket", "Thalang"] },
      { arrProvince: "Chiangmai", arrDistrict: ["Mueang Chiangmai", "Chang Phueak"] },
    ],
  };


  componentDidMount = async () => {
    try {
      let resultServices = await Axios.get('/getServicesForGuest')
      let resultAnimals = await Axios.get('/getAnimalsForGuest')
      this.setState({
        animals: resultAnimals.data,
        services: resultServices.data,
      })
    } catch {

    }
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleTickTakeCareOf = (animalId) => (e) => {
    const { checked } = e.target
    if (checked) {
      this.setState(
        { takeCareOf: [...this.state.takeCareOf, animalId] }
      );
      console.log(this.state.takeCareOf)
    } else {
      this.setState(
        {
          takeCareOf: this.state.takeCareOf.filter(
            takecare => takecare !== animalId
          )
        }
      );
      console.log(this.state.takeCareOf)
    }
  };

  handleTickServiceOf = (serviceId) => (e) => {
    const { checked } = e.target
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
  }
  handleSelectDay = (moment) => async () => {
    console.log("moment is :", moment.format('DD/MM/YYYY'))
    if (!this.state.rate) {
      return
    }
    try {
      // await Axios.post('/createJob',{
      //   date: moment.format('DD/MM/YYYY'),
      //   rate: this.state.rate
      // })
      this.setState({
        selectDate: moment.format('DD/MM/YYYY'),
        rate: this.state.rate
      })

      // let resultAllMatchJobs = await Axios.get('./allMatchjobsByUserId')
      // this.setState({ jobs: resultAllMatchJobs.data })

    } catch (error) {
      console.log(error)
    }
  };

  handleSetRate = (e) => {
    const { value } = e.target
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({ rate: e.target.value })
    }
  }

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
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  checkTickBeforeRegister = () => {
    notification.open({
      message: 'Service fail',
      description: 'Please full field all information',
      icon: <Icon type="warning" style={{ color: 'red' }} />,
    });

  }
  //-----------register----------//
  setModalRegisterVisible = (modalRegisterVisible) => {
    this.setState({
      modalRegisterVisible
    });
  }

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
  handleCreateCardForGuest = async () => {
    try {
      let resultSaveTakeCareOf = await Axios.post('/createUserTakeCareOf', {
        takeCareOf: this.state.takeCareOf
      })
      let resultSaveServiceOf = await Axios.post('/createUserServiceOf', {
        serviceOf: this.state.serviceOf
      })
      let resultDateAndRate = await Axios.post('/createJob', {
        date: this.state.selectDate,
        rate: this.state.rate
      })
      this.saveService()
    } catch (error) {
      console.log(error);
    }
  }

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
              //----------------Login-----------------//
              let email = this.state.emailRegister;
              let password = this.state.passwordRegister;
              console.log("email is:", email, "and password is:", password)
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
                  await this.handleCreateCardForGuest()
                  successSignUpNotification();
                  this.props.history.push("/profile");
                  window.location.reload(true);
                })
                .catch(err => {
                  console.error(err, "--------------error-------");
                  // message.error("");
                  this.props.form.resetFields();
                  failSignUpNotification()
                });

            })
            .catch(err => {
              console.error(err.message);
            });
        }
        console.log(this.state.emailRegister)
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
  render() {
    const { Step } = Steps;
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;

    console.log("animal id is:", this.state.takeCareOf)
    console.log("service id is:", this.state.serviceOf)
    console.log("Day you select is:", this.state.selectDate, "And rate is:", this.state.rate)
    const steps = [
      {
        title: 'Take Care of',
        content:
          <div style={{
            border: '0px solid', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
          }}
          >
            {this.state.animals.map(animal =>
              <Checkbox
                key={'A' + animal.id}
                onChange={this.handleTickTakeCareOf(animal.id)}
                checked={this.state.takeCareOf.includes(animal.id)}
              >
                {animal.animal}<br />
                <img style={{ width: '100px', height: '100px' }} src={animal.imganimal_url} />
              </Checkbox>
            )}
          </div>
      },
      {
        title: 'Service of',
        content:
          <div style={{
            border: '0px solid', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
          }}
          >
            {this.state.services.map(service =>
              <Checkbox
                key={'S' + service.id}
                onChange={this.handleTickServiceOf(service.id)}
                checked={this.state.serviceOf.includes(service.id)}
              >
                {service.service}<br />
                <img style={{ width: '100px', height: '100px' }} src={service.imgservice_url} />
              </Checkbox >
            )}
          </div>
      },
      {
        title: "Select Calendar",
        content:
          <Calendar
            className="job-calendar-findjobs"
            dateCellRender={this.dateCellRender}
            monthCellRender={this.monthCellRender}
            disabledDate={this.disabledDate}
          />
      },
    ];

    return (
      <div className='container-findjobs-step'>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
              Back
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={(
                this.state.takeCareOf.length == 0 ||
                this.state.serviceOf.length == 0 ||
                this.state.selectDate == "" ||
                this.state.rate == null) ? (() => this.checkTickBeforeRegister()) : (() => this.setModalRegisterVisible(true))}
            >
              Register
            </Button>
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
    );
  }
}

const FindJobs = Form.create()(FindJobsComponent)

export default withRouter(FindJobs);
