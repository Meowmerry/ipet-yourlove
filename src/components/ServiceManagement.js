import React, { Component } from 'react'
import { Table, Tag, Popconfirm, message, Icon, Row, Modal, Input } from "antd";
import style from "../pages/Admin.module.css";
import Axios from "axios"


function cancel(e) {
    console.log(e);
    message.error("Cancle");
}

export class ServiceManagement extends Component {
    state = {
        visible: false,
        allservice: [],
        serviceType: "",
        imgService: ""
    };

    componentDidMount = () => {
        Axios.get("http://localhost:8080/getallservice")
            .then(result => {
                this.setState({ allservice: result.data })
                console.log("componentDidMount service")
            }).catch(err => {
                console.log(err)
            })
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        Axios.post("http://localhost:8080/addservice", {
            service: this.state.serviceType,
            imgservice: this.state.imgService
        }).then(result => {
            console.log(result)
            this.setState({
                visiblecreate: false
            });

            Axios.get("http://localhost:8080/getallservice")
            .then(result => {
                this.setState({ allservice: result.data })
                console.log("componentDidMount service")
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log({ message: err })
        })
        this.setState({
            visible: false
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    confirm = (sid) => (e) => {
        console.log(sid)
        Axios.delete("http://localhost:8080/deleteservice", {
            data: {
                id: sid
            }
        }).then(result => {
            console.log(result)
            message.success("Delete service sucess");

            Axios.get("http://localhost:8080/getallservice")
            .then(result => {
                this.setState({ allservice: result.data })
                console.log("componentDidMount service")
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log({ message: err })
        })
    }

    render() {

        const columns = [
            {
                title: "Id",
                dataIndex: "Id",
                key: "Id",
                render: text => <a style={{ color: "black" }}>{text}</a>
            },
            {
                title: "Service-Type",
                key: "Service-Type",
                dataIndex: "tags",
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = "gray";
                            if (tag === "Sitting") {
                                color = "darkgray";
                            } else if (tag === "Overnight") {
                                color = "lightgray"
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
            {
                title: "Action",
                key: "action",
                render: Object => {
                    let service = Object.Id
                    return (
                        <span>
                            <Popconfirm
                                title="Are you sure do you want to delete this admin?"
                                onConfirm={this.confirm(service)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">
                                    <Icon type="delete" style={{ fontSize: "20px", color: "gray" }} />
                                </a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ];

        let data = this.state.allservice.map(ser => ({
            Id: ser.id,
            tags: [ser.service]
        }))

        return (
            <div className={style.containerService}>
                <Row className={style.adminview}>
                    <span>
                        <Icon type="plus-circle" style={{fontSize:'20px',float:'right',marginTop:'3px'}} onClick={this.showModal} />
                        <Modal
                            title="Create Service"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Input
                                placeholder="Service-Type"
                                className={style.createadminmodal}
                                onChange={e => this.setState({ serviceType: e.target.value })}
                            />

                            <Input
                                placeholder="Service-Image"
                                className={style.createadminmodal}
                                onChange={e => this.setState({ imgService: e.target.value })}
                            />
                        </Modal>
                    </span>
                </Row>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}
export default ServiceManagement
