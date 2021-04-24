import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'
import "./ModalRegister.scss"

function onBlur() {
  // console.log("blur");
}

function onFocus() {
  // console.log("focus");
}

function onSearch(val) {
  // console.log("search:", val);
}
function callback(key) {
  console.log(key);
}

export default class ModalRegister extends Component {

  // state ={
  //   location: [
  //     { arrProvince: "Bangkok", arrDistrict: ["Sathon", "Dindaeng"] },
  //     { arrProvince: "Phuket", arrDistrict: ["Mueang Phuket", "Thalang"] },
  //     { arrProvince: "Chiangmai", arrDistrict: ["Mueang Chiangmai", "Chang Phueak"] },
  //   ]
  // }
  render() {
    const getFieldDecorator = this.props.getFieldDecorator
    const { Option } = Select;
    console.log(this.props.location.map((province, idx) => (idx)))
    console.log(this.props.idxLocation)
    console.log("district is:", this.props.district)
    return (
      <Modal
        width={"30%"}
        // bodyStyle={{backgroundImage:'url(https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg)', backgroundSize:'cover'}}
        centered
        footer={null}
        visible={this.props.modalRegisterVisible}
        onOk={() => this.props.setModalRegisterVisible(false)}
        onCancel={() => this.props.setModalRegisterVisible(false)}
      >
        <div className="container-pop-regis">
          <div className="regis-title">
            <img
              alt="logo"
              src="https://uppicimg.com/file/HGwlTbW5.png"
              style={{ width: "15%", height: "15%" }}
            />
            Welcome to iPet!
                </div>
          <Form.Item>
            {" "}
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Not valid E-mail."
                },
                {
                  required: true,
                  message: "Please input your E-mail."
                }
              ]
            })(
              <Input
                className="input-reg"
                allowClear
                name="emailRegister"
                onChange={e => this.props.handleChange(e)}
                placeholder="E-mail"
              />
            )}{" "}
          </Form.Item>
          <Form.Item hasFeedback>
            {" "}
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password."
                },
                {
                  validator: this.props.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                className="input-reg"
                name="passwordRegister"
                onChange={e => this.props.handleChange(e)}
                placeholder="Password"
              />
            )}{" "}
          </Form.Item>
          <Form.Item hasFeedback>
            {" "}
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password."
                },
                {
                  validator: this.props.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                className="input-reg"
                placeholder="Confirm Password"
                onBlur={this.props.handleConfirmBlur}
              />
            )}{" "}
          </Form.Item>
          <Form.Item>
            {" "}
            {getFieldDecorator("firstname", {
              rules: [
                {
                  required: true,
                  message: "Please input your first name.",
                  whitespace: true
                }
              ]
            })(
              <Input
                className="input-reg"
                allowClear
                name="firstname"
                onChange={e => this.props.handleChange(e)}
                placeholder="First Name"
              />
            )}{" "}
          </Form.Item>
          <Form.Item>
            {" "}
            {getFieldDecorator("lastname", {
              rules: [
                {
                  required: true,
                  message: "Please input your last name.",
                  whitespace: true
                }
              ]
            })(
              <Input
                className="input-reg"
                allowClear
                name="lastname"
                onChange={e => this.props.handleChange(e)}
                placeholder="Last Name"
              />
            )}{" "}
          </Form.Item>
          <Form.Item>
            {" "}
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "Please input your phone number.",
                  type: "number",
                  whitespace: true
                }
              ]
            })(
              <InputNumber
                name="phone"
                onChange={this.props.handleChangePhone}
                className="regis-phone"
                type="number"
                placeholder="Phone"
              />
            )}{" "}
          </Form.Item>{" "}


          <Form.Item >
            {getFieldDecorator("province", {
              rules: [
                {
                  required: true,
                  type: 'number',
                  message: "Please input your province.",
                  whitespace: true
                }
              ]
            })(
              // <Input
              //   className="input-reg"
              //   allowClear
              //   name="province"
              //   onChange={e => this.props.handleChange(e)}
              //   placeholder="Province"
              // />
              <Select
                showSearch
                // value={this.props.province}
                style={{ width: "100%" }}
                placeholder="Select Province"
                optionFilterProp="children"
                onChange={this.props.handleProvinceChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.props.location.map((province, idx) => (
                  <Option key="province" value={idx}>
                    {province.arrProvince}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {" "}
            {getFieldDecorator("district", {
              rules: [
                {
                  required: true,
                  message: "Please input your district.",
                  whitespace: true
                }
              ]
            })(
              // <Input
              //   className="input-reg"
              //   allowClear
              //   name="district"
              //   onChange={e => this.props.handleChange(e)}
              //   placeholder="District"
              // />
              <Select
                showSearch
                // value={this.props.district}
                style={{ width: "100%" }}
                placeholder="Select District"
                optionFilterProp="children"
                onChange={this.props.onArrayDistrictChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.props.location.map((district, idx) =>
                  idx === this.props.idxLocation
                    ? district.arrDistrict.map((eachDistrict, index) => (
                      <Option key={eachDistrict}>{eachDistrict}</Option>
                    ))
                    : ""
                )}
              </Select>
            )}
          </Form.Item>
          <div>
            <button
              className="btn-reg"
              onClick={e => this.props.handleRegister(e)}
            >
              Register
                  </button>
          </div>
        </div>
      </Modal>
    )
  }
}
