import React, { Component } from "react";
import "./FindCare.scss";
import Axios from "../config/axios.setup";
import OvernightDate from "./FindCareComponent/OvernightDate";
import {
  Steps,
  Button,
  message,
  Form,
  Select,
  Row,
  Col,
  DatePicker,
  Card,
  Collapse,
  notification,
  Icon,
  Empty,
  InputNumber
} from "antd";
import moment from "moment";
import CardCare from "./CardCare";
import jwtDecode from "jwt-decode";
import CardHire from "./CardHire";

var dateFormat = require("dateformat");

function onBlur() {
  // console.log("blur");
}

function onFocus() {
  // console.log("focus");
}

function onSearch(val) {
  // console.log("search:", val);
}
function callback(key) {
  console.log(key);
}

export class FindCare extends Component {
  state = {
    current: 0,
    selectTimes: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
      "24:00"
    ],
    pets: [],
    services: [],
    choosePets: "",
    amount: 1,
    chooseService: "",
    location: [
      { arrProvince: "Bangkok", arrDistrict: ["Sathon", "Dindaeng"] },
      { arrProvince: "Phuket", arrDistrict: ["Mueang Phuket", "Thalang"] },
      { arrProvince: "Chiangmai", arrDistrict: ["Mueang Chiangmai", "Chang Phueak"] },
    ],
    dateReserve: [],
    startTime: [],
    idxStartTime: "",
    endTime: [],
    idxLocation: "",
    district: [],
    province: [],
    allCard: [],
    cards: [],
    allMatchjob: [],
    allHireMarchjob: [],
    star: 0,
    disabledEndTime: true
  }

  componentDidMount = async () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      let userInfo = jwtDecode(token)
      // console.log(userInfo.role);
      this.setState({
        isUser: userInfo.role === 'USER' ? true : false
      })
    }

    try {
      let now = new Date();
      this.setState({
        dateReserve: dateFormat(now, "dd/mm/yyyy")
      });

      let result = await Axios.get("/getAllMatchJobByCustomer");
      let allMatchjob = result.data;

      let petsFromDB = await Axios.get("/getAnimalsForGuest");
      let arrPets = petsFromDB.data;

      let servicesFromDB = await Axios.get("/getServicesForGuest");
      let arrServices = servicesFromDB.data;
      let resultAllHireMatchJob
      // console.log(this.state.isUser)
      if (!this.state.isUser) {
        console.log("role:Guest")
      } else {
        console.log("role:User")
        resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      }

      let token = localStorage.getItem("ACCESS_TOKEN");
      // console.log("token", token);
      let allMatchJobEcceptMine;

      if (token) {
        let userToken = await jwtDecode(token);
        allMatchJobEcceptMine = await allMatchjob.filter(
          job => job.provider_id !== userToken.id
        );
      } else {
        allMatchJobEcceptMine = allMatchjob;
      }

      this.setState({
        allMatchjob: allMatchJobEcceptMine,
        pets: arrPets.map(pet => {
          return {
            pet: pet.animal,
            img: pet.imganimal_url,
            border: ""
          };
        }),

        services: arrServices.map(service => {
          return {
            service: service.service,
            img: service.imgservice_url,
            border: ""
          };
        }),
      });
      if (!this.state.isUser) {

      } else {
        this.setState({
          allHireMarchjob: resultAllHireMatchJob.data
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  withdrawMoney = (pending) => {
    console.log(pending)
    notification.open({
      // message: "Update balance",
      description: `Left Balance: ${this.props.CusBalance - pending} bath`, 
     message: <div>Deduction from account : {pending} bath</div>,
      icon: <Icon type="smile" style={{ color: "blue" }} />
    });
  };

  handleFinishToComplete = (targetId, targetProId, targetProBalance, pending, cFirstname, cLastname, pFirstname, pLastname, cardId) => async () => {

    console.log(cFirstname)
    console.log(pFirstname)
    console.log(cardId)

    try {
      let result = await Axios.put("/updateStatusFinishToComplete/" + targetId);
      let resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      this.setState({
        allHireMarchjob: resultAllHireMatchJob.data
      })

      await Axios.put("/updateBalanceWhenComplete", {
        balanceCustomer: this.props.CusBalance - pending,
        provider_id: targetProId,
        balanceProvider: targetProBalance + pending,
      })

      this.withdrawMoney(pending)
      this.props.refreshInfo()

      let fullCustomer = cFirstname + " " + cLastname
      let fullProvider = pFirstname + " " + pLastname
      await Axios.put("/updatetransaction", {
        customerName: fullCustomer,
        providerName: fullProvider,
        cardId: cardId
      })

    } catch (error) {
      console.log(error)
    }
  }

  handleCancleHire = (targetId) => async () => {
    try {
      let result = await Axios.delete('/deleteHireMatchJob/' + targetId)
      let resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      this.setState({
        allHireMarchjob: resultAllHireMatchJob.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  hireJob = () => {
    notification.open({
      message: "Success!",
      description: "Your provider is ready for you",
      icon: <Icon type="smile" style={{ color: "#54b600" }} />
    });
  };

  handleHireMatchJob = (price, matchJobId) => async () => {
    try {
      console.log("price is: ", price, "And MatchJobId is :", matchJobId)
      let result = await Axios.post("/hireMatchJob/" + matchJobId, {
        choosePet: this.state.choosePets,
        amount: this.state.amount,
        chooseService: this.state.chooseService,
        toTime: this.state.endTime,
        fromTime: this.state.startTime,
        price: price
      })
      console.log("after hire match job is :", result.data)
      let resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      this.setState({
        allHireMarchjob: resultAllHireMatchJob.data,
        visable: false
      })
      this.hireJob();
    } catch (error) {
      console.log(error);
    }
  };

  handleHireMatchJobForGuest = async (price, matchJobId) => {
    try {
      console.log("price is: ", price, "And MatchJobId is :", matchJobId)
      let result = await Axios.post("/hireMatchJob/" + matchJobId, {
        choosePet: this.state.choosePets,
        amount: this.state.amount,
        chooseService: this.state.chooseService,
        toTime: this.state.endTime,
        fromTime: this.state.startTime,
        price: price
      })
      console.log("after hire match for guest job is :", result.data)
      let resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      this.setState({
        allHireMarchjob: resultAllHireMatchJob.data
      })
    } catch (error) {
      console.log(error);
    }
  };

  // === filter : tent version === //

  filterAllMatchJob = () => {
    // console.log(this.state.district)
    let resultFilter = this.state.allMatchjob.filter(
      matchjob => matchjob.date === this.state.dateReserve &&
        matchjob.providerId.province === this.state.province &&
        matchjob.providerId.district === this.state.district
    )

    let resultFilter2 = []
    resultFilter.forEach(matchjob =>
      matchjob.providerId.takecareofs.forEach(takecare =>
        takecare.animal_id === this.state.choosePets ? resultFilter2.push(matchjob) : null
      )
    )

    let resultFilter3 = []
    resultFilter2.forEach(matchjob =>
      matchjob.providerId.serviceofs.forEach(service =>
        service.service_id === this.state.chooseService ? resultFilter3.push(matchjob) : null
      )
    )

    this.setState({ cards: resultFilter3 },
      () => {
        if (this.state.cards.length === 0) {
          this.failFilterFindCare()
        } else {
          this.successFilterFindCare()
        }
      })
  }

  // ============================= //

  next() {
    const current = this.state.current + 1;
    this.setState({ current });

    // // 1 console.log
    // console.log(this.state.allMatchjob)
    // // 2 filter
    // let filteredJob = this.state.allMatchjob.filter(job => (
    //   job.providerId.takecareofs.findIndex((item) => item.animal_id === this.state.choosePets) >= 0
    // ))
    // console.log(filteredJob)

    // if (current === 1) {
    //   this.setState((state) => ({
    //     cards: filteredJob
    //   }))
    // }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  failFilterFindCare = () => {
    notification.open({
      message: "Match fail",
      description: "Do not have job match to you",
      icon: <Icon type="warning" style={{ color: "red" }} />
    });
  };

  successFilterFindCare = () => {
    notification.open({
      message: "Match success",
      description: "There are jobs match to you",
      icon: <Icon type="smile" style={{ color: "blue" }} />
    });
  };

  handleDone = () => {
    this.filterAllMatchJob()
    // this.setState({
    //   allCard: [],
    //   cards: []
    // });
    // await this.filterallCard();
    // if (this.state.allCard.length !== 0) {
    //   this.successFilterFindCare();
    // } else {
    //   this.failFilterFindCare();
    //   // console.log("error");
    //   this.setState({ cardFilterDate: [] })
    // }
  };

  // filterallCard = () => {
  //   this.state.allMatchjob.map((filter, index) => {
  //     if (filter.date === this.state.dateReserve) {        
  //       if (filter.providerId.province === this.state.province) {
  //         if (filter.providerId.district === this.state.district) {
  //           filter.providerId.takecareofs.map(takePet => {
  //             if (takePet.animal_id === this.state.choosePets) {
  //               filter.providerId.serviceofs.map(serPet => {
  //                 if (serPet.service_id === this.state.chooseService) {
  //                   this.setState(
  //                     state => ({
  //                       allCard: [...state.allCard, filter.provider_id]
  //                     }),
  //                     () => this.filterUserId()
  //                   );
  //                 } else {
  //                 }
  //               });
  //             } else {
  //             }
  //           });
  //         } else {
  //         }
  //       } else {
  //       }
  //     } else {
  //     }
  //   });
  // };

  // filterUserId = () => {
  //   this.setState({
  //     cards: []
  //   });
  //   this.state.allCard.map(onlyId => {
  //     this.state.allMatchjob.forEach(userId => {
  //       if (onlyId === userId.provider_id) {
  //         this.setState(state => ({
  //           cards: [...state.cards, userId]
  //         }));
  //       }
  //     });
  //   });
  // };


  handleChoosePet = value => {
    // value = idx + 1
    // console.log("pets = ", value);
    this.setState({
      choosePets: value,
      pets: this.state.pets.map((pet, idx) => {
        if (value - 1 === idx) {
          return {
            pet: pet.pet,
            img: pet.img,
            border: "thin solid #999999"
          };
        } else {
          return {
            pet: pet.pet,
            img: pet.img,
            border: ""
          };
        }
      })
    });
  };

  onChangeAmountPets = value => {
    // console.log("changed", value);
    this.setState({
      amount: value
    });
  };

  handleChooseService = value => {
    // console.log("services = ", value);
    this.setState({
      chooseService: value,
      services: this.state.services.map((service, idx) => {
        if (value - 1 === idx) {
          return {
            service: service.service,
            img: service.img,
            border: "thin solid #999999"
          };
        } else {
          return {
            service: service.service,
            img: service.img,
            border: ""
          };
        }
      })
    });
  };

  disabledDate = current => {
    // Can not select days before today and today
    return (
      current &&
      current <
      moment()
        .subtract(1, "days")
        .endOf("day")
    );
  };

  onDateChange = (date, dateString) => {
    // console.log(date, dateString); // use dateString
    this.setState({
      dateReserve: dateString
    });
  };

  handleStartTime = value => {
    this.setState({
      startTime: value,
      idxStartTime: this.state.selectTimes.indexOf(value),
      disabledEndTime: false,
      endTime: []
    });
  };

  handleEndTime = value => {
    this.setState({
      endTime: value
    });
  };

  handleProvinceChange = value => {
    // console.log(value);
    this.setState({
      province: this.state.location[value].arrProvince,
      idxLocation: value,
      district: []
    });
  };

  onArrayDistrictChange = value => {
    // console.log(value);
    this.setState({
      district: value
    });
  };

  getStar = async value => {
    await this.setState({ star: value })
    console.log("bbb", this.state.star)
  }

  submitStar = (tid, cid) => async () => {
    try {
      let result = await Axios.post("http://localhost:8080/getstarbyid", {
        userId: tid
      })

      let newStar = (result.data.count * result.data.star + this.state.star) / (result.data.count + 1)
      let newCount = result.data.count + 1


      let resultStar = await Axios.put("http://localhost:8080/updatestar", {
        star: newStar,
        count: newCount,
        userId: tid
      })

      let updateStatusEnd = await Axios.put("http://localhost:8080/updatestatustoend", {
        id: cid
      })
      let resultAllHireMatchJob = await Axios.get('/getAllHireMatchJobByCustomerId')
      this.setState({
        allHireMarchjob: resultAllHireMatchJob.data
      })

    } catch (error) {
      console.log(error);
    }

  }
  handleReset = () => {
    let now = new Date();
    this.setState({
      pets: this.state.pets.map((pet, idx) => {
        return {
          pet: pet.pet,
          img: pet.img,
          border: ""
        };
      }),
      services: this.state.services.map((service, idx) => {
        return {
          service: service.service,
          img: service.img,
          border: ""
        };
      }),
      choosePets: "",
      amount: 1,
      chooseService: "",
      idxLocation: "",
      dateReserve: dateFormat(now, "dd/mm/yyyy"),
      startTime: [],
      idxStartTime: "",
      endTime: [],
      district: [],
      province: [],
      allCard: [],
      cards: [],
      cardFilterDate: [],
      disabledEndTime: true
    });
  };

  render() {
    const { Step } = Steps;
    const { current } = this.state;
    // const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const dateFormatList = ["DD/MM/YYYY"];
    const currrentTime = new Date();
    const { Meta } = Card;
    const { Panel } = Collapse;
    const { animals, services } = this.props;
    let tokenDefaultTabKey = localStorage.getItem('ACCESS_TOKEN')
    const steps = [
      {
        title: "Pet",
        content: (
          <div>
            <div className="container-card">
              {this.state.pets.map((pet, idx) => (
                <div className="card">
                  <Card
                    style={{ border: pet.border }}
                    key={pet.pet}
                    onClick={() => this.handleChoosePet(idx + 1)}
                    value={pet.pet}
                    hoverable
                    cover={
                      <img
                        alt={pet.pet}
                        src={pet.img}
                      />
                    }
                  >
                    <Meta title={pet.pet} />
                  </Card>
                </div>
              ))}
            </div>
            <div>
              <span>Number of Pets : </span>
              <InputNumber
                min={1}
                // defaultValue={this.state.amount}
                value={this.state.amount}
                onChange={this.onChangeAmountPets}
              />
            </div>
          </div>
        )
      },
      {
        title: "Service",
        content: (
          <div className="container-card">
            {this.state.services.map((service, idx) => (
              <div className="card">
                <Card
                  style={{ border: service.border }}
                  key={service.service}
                  onClick={() => this.handleChooseService(idx + 1)}
                  value={service.service}
                  hoverable
                  cover={
                    <img
                      alt={service.service}
                      src={service.img}
                    />
                  }
                >
                  <Meta title={service.service} />
                </Card>
              </div>
            ))}
          </div>
        )
      },
      {
        title: "Date & Time",
        content: (
          <div className="container-choose-date">
            <Row type="flex" align="middle" className="padding-btw-row">
              <Col span={7} className="title-right">
                Date : &nbsp;
              </Col>
              <Col span={17}>
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormatList}
                  disabledDate={this.disabledDate}
                  onChange={this.onDateChange}
                  placeholder="Select Date"
                  defaultValue={moment(
                    this.state.dateReserve,
                    dateFormatList[0]
                  )}
                />
              </Col>
            </Row>

            <Row type="flex" align="middle" className="padding-btw-row-time">
              <Col span={7} className="title-right">
                Time : &nbsp;
              </Col>

              <Col span={7}>
                <Select
                  style={{ width: "100%" }}
                  value={this.state.startTime}
                  placeholder="Start"
                  onChange={this.handleStartTime}
                >
                  {this.state.selectTimes.map((time, index) =>
                    index <= this.state.selectTimes.length - 2 ? (
                      <Option value={time}>{time}</Option>
                    ) : (
                        ""
                      )
                  )}
                </Select>
              </Col>

              <Col span={3}>
                <span>to</span>
              </Col>

              <Col span={7}>
                <Select
                  disabled={this.state.disabledEndTime}
                  style={{ width: "100%" }}
                  value={this.state.endTime}
                  placeholder="End"
                  onChange={this.handleEndTime}
                >
                  {this.state.selectTimes.map((time, index) =>
                    index > 0 ? (
                      index <= this.state.idxStartTime ? (
                        <Option disabled value={time}>
                          {time}
                        </Option>
                      ) : (
                          <Option value={time}>{time}</Option>
                        )
                    ) : (
                        ""
                      )
                  )}
                </Select>
              </Col>
            </Row>
          </div>
        )
      },
      {
        title: "Location",
        content: (
          <div className="container-choose-location">
            <Row type="flex" align="middle" className="padding-btw-row">
              <Col span={10} className="title-right">
                Province : &nbsp;
              </Col>
              <Col span={14}>
                <Select
                  showSearch
                  value={this.state.province}
                  style={{ width: "100%" }}
                  placeholder="Select Province"
                  optionFilterProp="children"
                  onChange={this.handleProvinceChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.location.map((province, idx) => (
                    <Option key="province" value={idx}>
                      {province.arrProvince}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Row type="flex" align="middle" className="padding-btw-row">
              <Col span={10} className="title-right">
                District : &nbsp;
              </Col>
              <Col span={14}>
                <Select
                  showSearch
                  value={this.state.district}
                  style={{ width: "100%" }}
                  placeholder="Select District"
                  optionFilterProp="children"
                  onChange={this.onArrayDistrictChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.location.map((district, idx) =>
                    idx === this.state.idxLocation
                      ? district.arrDistrict.map((eachDistrict, index) => (
                        <Option key={eachDistrict}>{eachDistrict}</Option>
                      ))
                      : ""
                  )}
                </Select>
              </Col>
            </Row>
          </div>
        )
      }
    ];

    const titleCardChoose = (
      <div>
        <Row type="flex" align="middle">
          <Col span={12}>
            <span>Jobs detail</span>
          </Col>
          <Col span={12} className="btn-reset-data">
            <span>
              <Button onClick={this.handleReset}>Reset</Button>
            </span>
          </Col>
        </Row>
      </div>
    );

    // console.log("------------------------------------------");
    // console.log("choosePets :", this.state.choosePets);
    // console.log("amount :", this.state.amount);
    // console.log("chooseService :", this.state.chooseService);
    // console.log("dateReserve :", this.state.dateReserve);
    // console.log("startTime :", this.state.startTime);
    // console.log("endTime :", this.state.endTime);
    // console.log("province :", this.state.province);
    // console.log("district :", this.state.district);
    // console.log("pets", this.state.pets);
    // console.log("allCard :", this.state.allCard);
    // console.log("cards :", this.state.cards);
    // console.log("allMatchjob :", this.state.allMatchjob);

    return (
      <>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <Icon type="check-circle" theme="filled"
            style={{ margin: '0px 10px' }}
          />
          <div>What care do you need ?</div>
        </div>
        <div className="container-step">
          <Steps className="step-number" current={current} direction='horizontal'>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">
            {/* {showCardsBeforeFilter} */}
            <Card className="yourChoose"
              title={titleCardChoose} bordered={false}
            >
              <Row type="flex" align="middle">
                <Col span={9} className="title-right">
                  Pet : &nbsp;
                </Col>
                <Col span={3} style={{ textAlign: 'left' }}>
                  {animals.find(animal => animal.id === this.state.choosePets)
                    ? animals.find(animal => animal.id === this.state.choosePets)
                      .animal
                    : ""}
                </Col>
                <Col span={12} className="title-right" style={{ textAlign: 'left' }}>
                  x {this.state.amount}
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={9} className="title-right">
                  Service : &nbsp;
                </Col>
                <Col span={15} style={{ textAlign: 'left' }}>
                  {services.find(
                    service => service.id === this.state.chooseService
                  )
                    ? services.find(
                      service => service.id === this.state.chooseService
                    ).service
                    : ""}
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={9} className="title-right" >
                  Date : &nbsp;
                </Col>
                <Col span={15} style={{ textAlign: 'left' }}>
                  {this.state.dateReserve}
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={9} className="title-right">
                  Time : &nbsp;
                </Col>
                <Col span={4} style={{ textAlign: 'left' }}>{this.state.startTime}</Col>
                <Col span={2} style={{ textAlign: 'c' }}>to</Col>
                <Col span={9} style={{ textAlign: 'left' }}>{this.state.endTime}</Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={9} className="title-right" >
                  Province : &nbsp;
                </Col>
                <Col span={15} style={{ textAlign: 'left' }}>
                  {this.state.province}
                </Col>
              </Row>
              <Row type="flex" align="middle">
                <Col span={9} className="title-right" >
                  District : &nbsp;
                </Col>
                <Col span={15} style={{ textAlign: 'left' }}>
                  {this.state.district}
                </Col>
              </Row>
            </Card>
            <div className='step-choose'>{steps.length ? steps[current].content : ""}</div>
          </div>
          <div className="steps-action">
            <div style={{ textAlign: 'right' }}>
              {current > 0 && (
                <Button style={{ marginRight: '10px', width: '70px' }} onClick={() => this.prev()}>
                  Back
              </Button>
              )}
              {current === steps.length - 1 && (
                <Button style={{ width: '70px' }} type="primary" onClick={this.handleDone}>
                  Match
                  </Button>
              )}
              {current < steps.length - 1 && (
                <Button style={{ width: '70px' }} type="primary" onClick={() => this.next()}>
                  Next
                      </Button>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center' }}>
          <Icon type="down-square" theme="filled"
            style={{ margin: '0px 10px' }}
          />
          <div>The care that mathch to you</div>
        </div>
        {
          this.state.cards.length === 0 ?
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{
                border: '0px solid', height: '200px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}
            /> :
            <div className="filterCare">
              {
                this.state.cards.map(job => (
                  <CardCare
                    job={job}
                    choosePets={this.state.choosePets}
                    amount={this.state.amount}
                    animals={animals}
                    chooseService={this.state.chooseService}
                    services={services}
                    fromTime={this.state.startTime}
                    toTime={this.state.endTime}
                    handleHireMatchJob={this.handleHireMatchJob}
                    handleHireMatchJobForGuest={this.handleHireMatchJobForGuest}
                  />
                ))
              }
            </div>
        }

        {
          tokenDefaultTabKey ? 
          <div style={{marginBottom:'15px',display:'flex', alignItems:'center'}}>
            <Icon type="appstore" theme="filled" 
              style={{margin:'0px 10px'}}
            />
            <div>My request</div>
          </div> : null
        } 
        <div 
          className='container-cardhire'
          style={{
            border: '0px solid', marginTop: '10px',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          {
            this.state.allHireMarchjob.map(hirejob =>
              <CardHire
                key={hirejob.id}
                hirejob={hirejob}
                animals={animals}
                services={services}
                handleCancleHire={this.handleCancleHire}
                getStar={this.getStar}
                submitStar={this.submitStar}
                star={this.state.star}
                handleFinishToComplete={this.handleFinishToComplete}
              />
            )
          }
        </div>

      </>
    );
  }
}

export default Form.create({})(FindCare);
