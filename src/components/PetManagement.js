import React, { Component } from 'react'
import { Table, Tag, Popconfirm, message, Icon, Row, Modal, Input } from "antd";
import style from "../pages/Admin.module.css";
import Axios from "axios"


function cancel(e) {
    console.log(e);
    message.error("Cancle");
}

export class PetManagement extends Component {
    state = {
        visible: false,
        petType: "",
        imgurl: "",
        allanimal: []
    };

    componentDidMount = () => {
        Axios.get("http://localhost:8080/getallanimal")
            .then(result => {
                this.setState({ allanimal: result.data })
                console.log("componentDidMount animal")
            }).catch(err => {
                console.log(err)
            })
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (this.handleOk()) {

    //         Axios.get("http://localhost:8080/getallanimal")
    //             .then(result => {
    //                 this.setState({ allanimal: result.data })
    //                 console.log("refresh admin/user")
    //             }).catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        Axios.post("http://localhost:8080/addanimal", {
            animal: this.state.petType,
            imganimal_url: this.state.imgurl
        }).then(result => {
            console.log(result)
            this.setState({
                visiblecreate: false
            });

            Axios.get("http://localhost:8080/getallanimal")
            .then(result => {
                this.setState({ allanimal: result.data })
                console.log("componentDidMount animal")
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

    confirm = (aid) => (e) => {
        console.log(aid)
        Axios.delete("http://localhost:8080/deleteanimal", {
            data: {
                id: aid
            }
        }).then(result => {
            console.log(result)
            message.success("Delete animal sucess");

            Axios.get("http://localhost:8080/getallanimal")
            .then(result => {
                this.setState({ allanimal: result.data })
                console.log("componentDidMount animal")
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
                title: "Animal-Type",
                key: "Animal-Type",
                dataIndex: "tags",
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = "gray";
                            if (tag === "Cat") {
                                color = "lightgray";
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
                render: (object) => {
                    let id = object.Id
                    return (
                        <span>
                            <Popconfirm
                                title="Are you sure do you want to delete this admin?"
                                onConfirm={this.confirm(id)}
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

        let data = this.state.allanimal.map(ani => ({
            Id: ani.id,
            tags: [ani.animal]
        }))
        return (
            <div className={style.containerPet}>
                <Row className={style.adminview}>
                    <span>
                        <Icon type="plus-circle" style={{fontSize:'20px',float:'right',marginTop:'3px'}} onClick={this.showModal} />
                        <Modal
                            title="Create Pet"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Input
                                placeholder="Pet-Type"
                                className={style.createadminmodal}
                                onChange={e => this.setState({ petType: e.target.value })}
                            />

                            <Input
                                placeholder="Pet-Image"
                                className={style.createadminmodal}
                                onChange={e => this.setState({ imgurl: e.target.value })}
                            />
                        </Modal>
                    </span>
                </Row>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}
export default PetManagement
