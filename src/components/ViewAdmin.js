import React, { Component } from "react";
import { Table, Tag, Popconfirm, message, Icon, Row, Modal, Input, notification } from "antd";
import style from "../pages/Admin.module.css";
import Axios from "axios"

// function confirm(e) {
//   console.log(e.target);
//   Axios.delete("http://localhost:8080/deleteadmin", {
//     id: this.state.deleteId
//   }).then(result => {
//     console.log(result)
//     message.success("Delete sucess");
//   }).catch(err => {
//     console.log({ message: err })
//   })
// }
let textnoti = ""
function cancel(e) {
  console.log(e);
  message.error("Cancle");
}

const notiCreate = (text) => {
  notification.open({
    message: 'Sucess',
    description: text,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
export class ViewAdmin extends Component {

  state = {
    visiblecreate: false,
    visibleedit: false,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    district: "",
    province: "",
    editId: "",
    user: []
  };

  componentDidMount = () => {
    Axios.get("http://localhost:8080/getalluser")
      .then(result => {
        this.setState({ user: result.data })
        console.log("componentDidMount User/Admin")
      }).catch(err => {
        console.log(err)
      })
  }

  // componentDidUpdate = (e) => {
  //   Axios.get("http://localhost:8080/getalluser")
  //     .then(result => {
  //       this.setState({ user: result.data })
  //       console.log("refresh admin/user")
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // }

  showModal = () => {
    this.setState({
      visiblecreate: true
    });
  };

  showModall = (id, object) => () => {
    console.log(id)
    console.log("show modal", object)
    this.setState({
      editId: id,
      visibleedit: true,
      firstname: object.firstname,
      lastname: object.lastname,
      phone: object.phone,
      email: object.email,
      address: object.address,
      district: object.district,
      province: object.province,
    });
  };

  handlecreate = e => {
    console.log(e);
    Axios.post("http://localhost:8080/registeradmin", {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }).then(result => {
      textnoti = "Create Admin Sucess"
      console.log(result)
      this.setState({
        visiblecreate: false
      });
      notiCreate(textnoti)

      Axios.get("http://localhost:8080/getalluser")
      .then(result => {
        this.setState({ user: result.data })
        console.log("componentDidMount User/Admin")
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log({ message: err })
      this.setState({
        visible: false
      });
    })

  };

  handleedit = e => {
    console.log(e);
    Axios.put("http://localhost:8080/edituser", {
      id: this.state.editId,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      district: this.state.district,
      province: this.state.province
    }).then(result => {
      textnoti = "Edit User Sucess"
      console.log(result)
      notiCreate(textnoti)
      this.setState({
        visibleedit: false
      });

      Axios.get("http://localhost:8080/getalluser")
      .then(result => {
        this.setState({ user: result.data })
        console.log("componentDidMount User/Admin")
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log({ message: err })
      this.setState({
        visible: false
      });
    })

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visiblecreate: false,
      visibleedit: false
    });
  };

  confirm = (uid) => (e) => {
    console.log(uid)
    Axios.delete("http://localhost:8080/deleteadmin", {
      data: {
        id: uid
      }
    }).then(result => {
      console.log(result)
      message.success("Delete sucess");
      this.setState({ deleteId: "" })

      Axios.get("http://localhost:8080/getalluser")
      .then(result => {
        this.setState({ user: result.data })
        console.log("componentDidMount User/Admin")
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log({ message: err })
    })
  }

  render() {
    let columns = [
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        render: text => <a style={{ color: "black" }}>{text}</a>
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a style={{ color: "black" }}>{text}</a>
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = "geekblue";
              if (tag === "USER") {
                color = "green";
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
        render: object => {
          // console.log("render", object)
          let role = object.tags[0];
          let userid = object.id
          if (role === "USER") {
            return (
              <span>
                <span onClick={this.showModall(userid, object)}>
                  <a href="#">
                    <Icon type="edit" style={{ fontSize: "20px", color: "gray" }} />
                  </a>
                </span>
                <Icon type="more" />
                <span>
                  <Popconfirm
                    title="Are you sure delete this User?"
                    onConfirm={this.confirm(userid)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      <Icon type="delete" style={{ fontSize: "20px", color: "gray" }} />
                    </a>
                  </Popconfirm>
                </span>
              </span>
            );
          } else {
            return (
              <span>
                <Popconfirm
                  title="Are you sure do you want to delete this admin?"
                  onConfirm={this.confirm(userid)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#">
                    <Icon type="delete" style={{ fontSize: "20px", color: "gray" }} />
                  </a>
                </Popconfirm>
              </span>
            );
          }
        }
      }
    ];

    let data = this.state.user.map((user) =>
      ({
        email: user.email,
        name: user.firstname + " " + user.lastname,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        address: user.address,
        district: user.district,
        province: user.province,
        tags: [user.role],
        id: user.id
      })
    )

    return (
      <div className="containerAdmin">
        <Row className={style.adminview}>
          <span>
            <Icon type="plus-circle" style={{fontSize:'20px',float:'right',marginTop:'3px'}} onClick={this.showModal} />

            <Modal
              title="Create Admin"
              visible={this.state.visiblecreate}
              onOk={this.handlecreate}
              onCancel={this.handleCancel}
            >
              <Input
                placeholder="Admin e-mail"
                className={style.createadminmodal}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Input
                placeholder="Password"
                className={style.createadminmodal}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Input
                placeholder="Firstname"
                className={style.createadminmodal}
                onChange={e => this.setState({ firstname: e.target.value })}
              />
              <Input
                placeholder="Lastname"
                className={style.createadminmodal}
                onChange={e => this.setState({ lastname: e.target.value })}
              />
            </Modal>

            <Modal
              title="Edit User"
              visible={this.state.visibleedit}
              onOk={this.handleedit}
              onCancel={this.handleCancel}
            >
              <p>First name</p>
              <Input
                placeholder="firstname"
                className={style.createadminmodal}
                onChange={e => this.setState({ firstname: e.target.value })}
                value={this.state.firstname}
              />
              <p>Last name</p>
              <Input
                placeholder="lastname"
                className={style.createadminmodal}
                onChange={e => this.setState({ lastname: e.target.value })}
                value={this.state.lastname}
              />
              <p>Phone</p>
              <Input
                placeholder="phone"
                className={style.createadminmodal}
                onChange={e => this.setState({ phone: e.target.value })}
                value={this.state.phone}
              />
              <p>E-mail</p>
              <Input
                placeholder="email"
                className={style.createadminmodal}
                onChange={e => this.setState({ email: e.target.value })}
                value={this.state.email}
              />
              <p>Address</p>
              <Input
                placeholder="address"
                className={style.createadminmodal}
                onChange={e => this.setState({ address: e.target.value })}
                value={this.state.address}
              />
              <p>District</p>
              <Input
                placeholder="district"
                className={style.createadminmodal}
                onChange={e => this.setState({ district: e.target.value })}
                value={this.state.district}
              />
              <p>Province</p>
              <Input
                placeholder="province"
                className={style.createadminmodal}
                onChange={e => this.setState({ province: e.target.value })}
                value={this.state.province}
              />
            </Modal>
          </span>

        </Row>
        <Table className="containerAdmin" columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default ViewAdmin;
