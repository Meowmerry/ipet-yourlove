import React, { Component } from "react";
import { Icon, Popconfirm, Input, notification } from "antd";

class PopService extends Component {
  failInputRate = () => {
    notification.open({
      message: "Service fail",
      description: "Please input Rate (Bath/hour)",
      icon: <Icon type="warning" style={{ color: "red" }} />
    });
  };

  render() {
    const {
      moment,
      rate,
      jobs,
      handleSelectDay,
      handleSetRate,
      filterService
    } = this.props;
    return (
      <div>
        {filterService(jobs).length === 0 ? (
          <Popconfirm
            placement="left"
            title={
              <div>
                <div>
                  <span>Do you want to service on </span>
                  <br />
                  <span style={{ color: "red" }}>
                    "{moment.format("Do MMM YYYY")}"
                  </span>{" "}
                  ?
                </div>
                <hr style={{ margin: "10px 0px" }} />
                <div>
                  <div>at Rate: (Bath/hour)</div>
                  <Input
                    onChange={handleSetRate}
                    value={rate}
                    placeholder="Input only Number"
                  />
                </div>
              </div>
            }
            onConfirm={rate ? handleSelectDay(moment) : this.failInputRate}
            okText="Yes"
            cancelText="No"
          >
            <Icon style={{ fontSize: "15px" }} type="schedule" />
          </Popconfirm>) : (
          <Icon type="schedule" 
              style={{ fontSize: "25px", color:'#00ccff' }}
              onClick={()=>console.log(moment.format('DD/MM/YYYY'))} 
          />
        )}
      </div>
    );
  }
}

export default PopService;
