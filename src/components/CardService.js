import React, { Component } from 'react';
import { Card, Avatar, Icon, Popconfirm, Popover, Button, Empty } from 'antd';
import './CardService.scss'
import DetailCustomer from './DetailCustomer';
class CardService extends Component {
    
    render() {
        const {job, animals, services, handleCancleDay, handlePokeToAccept, handleCanclePoke, handleAcceptToFinish} = this.props
       
        return ( 
            <Card 
                className='card-service' 
                title={
                    <div>
                        <span><b>Service on</b> </span>                        
                        <span style={{color:'#333333'}}> 
                        {/* <span style={{ borderRadius:'4px', padding:'0px 7px',
                                        color:'white', backgroundColor:'silver' }}
                        > */}
                            {job.date}
                        </span><br />
                        <span><b>Rate</b> </span>                        
                        <span> 
                        {/* <span style={{ borderRadius:'4px', padding:'0px 7px',
                                        color:'white', backgroundColor:'silver' }}
                        > */}
                            {job.rate > 999 ? (job.rate+'').slice(0,-3)+','+(job.rate+'').slice(-3) : job.rate}
                        </span>
                        <span> <b>Bath/hour</b> </span>
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
                extra={ 
                    <Popconfirm 
                        title="Are you sure you want to delete this service? "
                        onConfirm={handleCancleDay(job.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Icon type="delete" theme="filled" 
                            style={{fontSize:'20px', 
                                display: job.customers.length === 0 ? '' : 'none'
                            }}
                        />
                    </Popconfirm>
                } 
            >
                <div style={{display: 'flex', flexWrap:'wrap'}}>
                {job.customers.length === 0 ? 
                    <div style={{border:'0px solid', width:'100%'}}>
                        <Empty imageStyle={{height:'60px'}} description={false}/>
                    </div>:
                        job.customers.map(customer => 
                            customer.status === 'poke' ?
                                <Popover key={customer.customer.id}
                                    placement="rightBottom" 
                                    trigger ='click'
                                    title={
                                        <DetailCustomer 
                                            customer={customer} 
                                            job={job} 
                                            animals={animals}
                                            services={services}
                                        />
                                    }
                                    content={
                                        <div>
                                            <div  
                                                style={{color: 'white', backgroundColor:'#666666', padding:'0px 5px',
                                                        borderRadius: '4px', width:'fit-content', marginTop:'5px'}}
                                            >{  
                                                customer.status === 'poke' ?
                                                'Do you want to accept this job ?':
                                                customer.status === 'accept' ?
                                                    'Did you finish your job ?' :
                                                    customer.status === 'finish' ?
                                                    "Waiting for customer's confirmation" :
                                                    null
                                            }
                                            </div>    
                                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                                <Button type='link' style={{padding:'5px'}}
                                                    onClick={handlePokeToAccept(customer.id, customer.customer.id, customer.customer.balance, customer, customer.customer.firstname, customer.customer.lastname, job.providerId.firstname, job.providerId.lastname, job.id)}>
                                                    <b>Accept</b>
                                                </Button>
                                                <Popconfirm 
                                                    title="Are you sure you want to reject this job?"
                                                    onConfirm={handleCanclePoke(job.id,customer.customer.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type='link' style={{padding:'5px', color:'#666666'}}>Reject</Button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    }
                                >
                                    <Avatar key={customer.id}
                                        className='customerAvatar'
                                        src={"http://localhost:8080/"+customer.customer.user_image}
                                        style={{margin: '0px 15px 15px 0px', border:'3px solid',cursor:"pointer",
                                        borderColor: customer.status === 'poke'?'gold': null                        
                                        }}
                                        size={60} 
                                    />
                                </Popover> :
                                    customer.status === 'accept' ?
                                        <Popconfirm key={customer.customer.id}
                                            placement="rightBottom"
                                            title={
                                                <DetailCustomer 
                                                    customer={customer} 
                                                    job={job}
                                                    animals={animals}
                                                    services={services}
                                                />
                                            }
                                            onConfirm={handleAcceptToFinish(customer.id)}
                                            okText="Finish"
                                            cancelText="No"
                                        >
                                            <Avatar key={customer.customer.id}
                                            className='customerAvatar'
                                            src={"http://localhost:8080/"+customer.customer.user_image}
                                            style={{margin: '0px 8px 8px 0px', border:'3px solid',cursor:"pointer",
                                            borderColor: customer.status === 'accept'?'#00e600': null               
                                            }}
                                            size={60} 
                                            />
                                        </Popconfirm>:
                                        customer.status === 'finish' ?
                                            <Popover key={customer.customer.id}
                                                placement="rightBottom"
                                                trigger='click'
                                                title={
                                                    <DetailCustomer 
                                                        customer={customer} 
                                                        job={job}
                                                        animals={animals}
                                                        services={services}
                                                    />
                                                }
                                            > 
                                                <Avatar key={customer.customer.id}
                                                    className='customerAvatar'
                                                    src={"http://localhost:8080/"+customer.customer.user_image}
                                                    style={{margin: '0px 8px 8px 0px', border:'3px solid',cursor:"pointer",
                                                    borderColor: customer.status === 'finish'?'violet': null                         
                                                    }}
                                                    size={60} 
                                                />
                                            </Popover> :
                                            <Popover key={customer.customer.id}
                                                placement="rightBottom"
                                                trigger='click'
                                                title={
                                                    <DetailCustomer 
                                                        customer={customer} 
                                                        job={job}
                                                        animals={animals}
                                                        services={services}
                                                    />
                                                }
                                            > 
                                                <Avatar key={customer.customer.id}
                                                    className='customerAvatar'
                                                    src={"http://localhost:8080/"+customer.customer.user_image}
                                                    style={{margin: '0px 8px 8px 0px', border:'3px solid',cursor:"pointer",
                                                    borderColor: '#00ffff'                         
                                                    }}
                                                    size={60} 
                                                />
                                            </Popover>
                    )
                }
                </div>
            </Card>
        );
    }
}
export default CardService;