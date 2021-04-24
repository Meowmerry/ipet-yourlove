import React, { Component } from 'react';
import { Steps, Button, Checkbox } from 'antd';
import './StepTakeCareOfService.scss'

const { Step } = Steps;

class StepTakeCareOfService extends Component {

    state = {
        current:0
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    // === antd - step ===//
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
        const { animals, services, takeCareOf, serviceOf,
                handleTickTakeCareOf, handleTickServiceOf, handleSetTakeCareOfAndService } = this.props
        const steps = [
            {
              title: 'Take Care of',
              content: 
                <div style={{border: '0px solid', height:'100%',
                            display:'flex', flexDirection:'column', justifyContent:'space-around' }}
                >
                    {animals.map(animal => 
                        <Checkbox 
                            key={'A'+animal.id}
                            onChange={handleTickTakeCareOf(animal.id)}
                            checked={takeCareOf.includes(animal.id)}
                        >
                            {animal.animal}<br/>
                            <img alt="ipet" style={{ width:'100px', height:'100px', marginTop:'10px'}} src={animal.imganimal_url} />
                        </Checkbox>
                    )}
                </div>
            },
            {
              title: 'Service of',
              content: 
                <div style={{border: '0px solid', height:'100%',
                    display:'flex', flexDirection:'column', justifyContent:'space-around'}}
                >
                    {services.map(service => 
                        <Checkbox 
                            key={'S'+service.id}
                            onChange={handleTickServiceOf(service.id)}
                            checked={serviceOf.includes(service.id)}
                        >
                            {service.service}<br/>
                            <img alt="ipet" style={{ width:'100px', height:'100px'}} src={service.imgservice_url} />
                        </Checkbox >
                    )}
                </div>
            }
        ];
        return (
          <div style={{width:'100%'}}>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                  Back
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={handleSetTakeCareOfAndService}>
                  Save
                </Button>
              )}
            </div>
          </div>
        );
    }
}

export default StepTakeCareOfService