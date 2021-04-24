import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

export class OvernightDate extends Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
        startDate:null,
        endDate:null,
        dateCompare:null
      };
      disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
      disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
      onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };
    
      onStartChange = value => {
          console.log(value._d)
        this.onChange('startValue', value);
        this.setState({startDate:value._d})
        
      };
    
      onEndChange = value => {
        console.log(value._d)
        this.onChange('endValue', value);
        this.setState({endDate:value._d})
      };
    
      handleStartOpenChange = open => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      };
    
      handleEndOpenChange = open => {
        this.setState({ endOpen: open });
      };

      compareBetweenTwoDate(){
        let startDate = moment(this.state.startDate)
        let endDate = moment(this.state.endDate)
        console.log(endDate.diff(startDate,'days'))
     return(
         <>
         {Object.is(endDate.diff(startDate,'days'),NaN) ? "":endDate.diff(startDate,'days')}
         
         </>
     )   
    }

      
    render() {
        const { startValue, endValue, endOpen } = this.state;
    return (
      <>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
        <p>{this.compareBetweenTwoDate()}</p>
      </>
    );
    }
}

export default OvernightDate

