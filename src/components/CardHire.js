import React, { Component } from 'react';
import { Card, Avatar, Popover, Icon, Popconfirm, Button, Rate  } from 'antd';
import './CardHire.scss'
import jwtDecode from 'jwt-decode'

class CardHire extends Component {
  render() {
    const { hirejob, animals, services, handleCancleHire, getStar, star, submitStar,handleFinishToComplete } = this.props
    const deposite = Math.round(hirejob.price*0.3)
    const pending = hirejob.price - deposite
    const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
    console.log(user)
    return (
        <Card 
            className='cardhire'
            title={
                <div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <div>
                            <span><b>Pet</b> &nbsp; 
                                <span>{ animals.find(animal => animal.id == hirejob.choosePet) ? animals.find(animal => animal.id == hirejob.choosePet).animal : '' }</span>
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp; 
                            <span><b>Service</b> &nbsp;
                            <span>{ services.find(service => service.id == hirejob.chooseService) ? services.find(service => service.id == hirejob.chooseService).service : '' }</span>
                            </span>
                        </div>
                        <span><b>Hire on</b> </span>                        
                        <span> 
                            {hirejob.customers.date}
                        </span><br />
                        <span>
                            <b>Time</b>   
                            <span> {hirejob.fromTime} </span> 
                            <span><b>to</b></span> 
                            <span> {hirejob.toTime} </span>
                        </span>
                    </div>
                        {
                            hirejob.status === 'poke' ? 
                                <Popconfirm 
                                    title="Are you sure you want to delete this service? "
                                    onConfirm={handleCancleHire(hirejob.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type="delete" 
                                        theme="filled" 
                                        style={{display: hirejob.status === 'poke' ? '' : 'none' }}
                                    />
                                </Popconfirm>
                                :hirejob.status === 'finish' ? 
                                    <Popconfirm 
                                        title="This hire is comleted ?"
                                        onConfirm={handleFinishToComplete(hirejob.id, hirejob.customers.providerId.id, hirejob.customers.providerId.balance, pending, user.firstname, user.firstname, hirejob.customers.providerId.firstname, hirejob.customers.providerId.lastname, hirejob.customers.id )}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button>Done</Button>
                                    </Popconfirm>
                                    : hirejob.status === 'complete' ?
                                    <Popover
                                        title="Rating and review"
                                        trigger='click'
                                        content={
                                            <div>
                                                <Rate size={"small"}  onChange={getStar} value={star} /><br />
                                                <div style={{border:'0px solid', textAlign:'right'}}>
                                                    <Button style={{margin:'10px 15px 0px 0px'}} size={"small"} onClick={submitStar(hirejob.customers.providerId.id, hirejob.id)} >Submit</Button>
                                                </div>
                                            </div>
                                        }
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Icon type="form" />
                                    </Popover>
                                        :hirejob.status === 'end' ?
                                        <Icon type="check-circle" />
                                        :null
                        }
                </div>
                    <div style={{display:'flex', flexWrap:'wrap' ,justifyContent:'space-between', fontSize:'12px', paddingTop:'10px'}}>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <div style={{height:'8px',width:'8px',backgroundColor:'gold', marginRight:'5px'}}></div>
                            <div>offer</div>
                        </span>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <div style={{height:'8px',width:'8px',backgroundColor:'#00e600', marginRight:'5px'}}></div>
                            <div>confirm</div>
                        </span>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <div style={{height:'8px',width:'8px',backgroundColor:'violet', marginRight:'5px'}}></div>
                            <div>finish</div>
                        </span>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <div style={{height:'8px',width:'8px',backgroundColor:'#00ffff', marginRight:'5px'}}></div>
                            <div>complete</div>
                        </span>
                    </div>
                </div>
            } 
        >
            <div style={{ display:'flex' }}>
                <Popover
                    placement="right"
                    trigger ='click'
                    content={
                        <div>
                            <div>
                                <b>Name: </b>
                                { hirejob.customers.providerId.firstname} &nbsp;
                                { hirejob.customers.providerId.lastname}
                            </div>
                            <div><b>Phone: </b> { hirejob.customers.providerId.phone}</div>
                            <div><b>Address: </b> {hirejob.customers.providerId.address}</div>
                            <div><b>District: </b> {hirejob.customers.providerId.district}</div>
                            <div><b>Provice: </b> {hirejob.customers.providerId.province}</div>
                        </div>    
                    }
                >
                    <Avatar 
                        className='customerAvatar'
                        src={"http://localhost:8080/"+hirejob.customers.providerId.user_image}
                        style={{margin: '0px 20px 10px 0px', border:'3px solid',cursor:"pointer",
                        borderColor: hirejob.status === 'poke' ? 'gold' : 
                                        hirejob.status === 'accept' ? '#00e600' :
                                            hirejob.status === 'finish' ? 'violet' :
                                                '#00ffff'                     
                        }}
                        size={60} 
                    />
                </Popover>
                <div>
                    <div><b> Total Price <span style={{color:'red'}}>{hirejob.price}</span> Baht </b></div>
                    <span>
                        <input readOnly type='checkbox' style={{marginRight:'5px'}} checked={hirejob.status !== 'poke' ? true : false}/>
                        <b>Deposite (30%): </b>  <span style={{color: 'red'}}>{deposite > 999 ? (deposite+'').slice(0,-3)+','+(deposite+'').slice(-3) : deposite}</span> <b>Bath</b>
                    </span><br />
                    <span>
                        <input readOnly type='checkbox' style={{marginRight:'5px'}} checked={hirejob.status !== 'complete' ? false : true}/>
                        <b>Pending (70%): </b>  <span style={{color: 'red'}}>{pending > 999 ? (pending+'').slice(0,-3)+','+(pending+'').slice(-3) : pending}</span> <b>Bath</b>
                    </span>
                </div>
            </div>
        </Card>
    );
  }
}

export default CardHire;
