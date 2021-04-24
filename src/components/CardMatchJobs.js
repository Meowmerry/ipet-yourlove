import React, { Component } from "react";
import "./CardMatchJobs.scss";
import Axios from "../config/axios.setup";
import {
  Steps,
  Button,
  message,
  Checkbox,
  Form,
  Select,
  Row,
  Col,
  DatePicker
} from "antd";

export class CardMatchJobs extends Component {
  state = {
    allCard: []
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleDone = async () => {
    try {
      let dateMatchJob = await Axios.get("/matchjobfilter");
      this.setState({
        fromPath_matchjobFilter: dateMatchJob.data
      });
      message.success("Processing complete!");
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const { Step } = Steps;

    const {
      current,
      choosePets,
      chooseService,
      dateReserve,
      startTime,
      endTime,
      province,
      district,
      fromPath_matchjobFilter
    } = this.props;

    const card = fromPath_matchjobFilter.map(date => {
      if (date.date === dateReserve) {
        if (date.providerId.province === province) {
          if (date.providerId.district === district) {
            return date.id;
          } else {
          }
        } else {
        }
      } else {
      }
    });

    console.log("card", card);

    return (
      <div>
        {/* <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={this.handleDone}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div> */}
        555555 {card}
      </div>
    );
  }
}

export default CardMatchJobs;
