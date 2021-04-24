import React, { Component } from 'react';

class DetailCustomer extends Component {
  render() {
    const {customer, job, animals, services} = this.props
    let total = customer.price
    let deposite = Math.round(total*0.3)
    let rest = total - deposite
    return (
        <div>
            <div><b>Name:</b> {customer.customer.firstname} {customer.customer.lastname}</div>
            <div><b>Phone:</b> {customer.customer.phone}</div>
            <div>
              <b>Pet:</b> {animals.find(animal => animal.id == customer.choosePet) ? animals.find(animal => animal.id == customer.choosePet).animal : ''} 
              &nbsp; x {customer.amount} &nbsp;&nbsp;&nbsp;
              <span>
                <b>Service:</b>
                <span> {services.find(service => service.id == customer.chooseService) ? services.find(service => service.id == customer.chooseService).service : ''} </span>
              </span>
            </div>
            <hr style={{border: '1px solid', margin:'5px 0px'}}/>
            <div><b>Time:</b> {customer.fromTime}-{customer.toTime}</div>
            <div><b>Total Price:</b> {total > 999 ? (total+'').slice(0,-3)+','+(total+'').slice(-3) : total} <b>Bath</b></div>
            <span style={{color:'red'}}>
              <input readOnly type='checkbox' style={{marginRight:'5px'}} checked={customer.status !== 'poke' ? true : false}/>
              <b>Deposite (30%): </b>  {deposite > 999 ? (deposite+'').slice(0,-3)+','+(deposite+'').slice(-3) : deposite} <b>Bath</b>
            </span><br />
            <span style={{color:'red'}}>
              <input readOnly type='checkbox' style={{marginRight:'5px'}} checked={customer.status !== 'complete' ? false : true}/>
              <b>Pending (70%): </b> {rest > 999 ? (rest+'').slice(0,-3)+','+(rest+'').slice(-3) : rest} <b>Bath</b>
            </span>
            <div  
              style={{color: 'white', backgroundColor:'#666666', padding:'0px 5px',
                      borderRadius: '4px', width:'fit-content', marginTop:'5px'}}
            >
            {  
              customer.status === 'accept' ?
                'Did you finish your job ?' :
                customer.status === 'finish' ?
                  "Wait for customer's confirmation" :
                    customer.status === 'complete' ?
                      "Transaction completed" : null
            }
            </div>
        </div>
    );
  }
}

export default DetailCustomer;
