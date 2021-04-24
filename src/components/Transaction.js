import React, { Component } from "react";
import { Table, Tag, Row} from "antd";
import style from "../pages/Admin.module.css";
import Axios from 'axios'
import moment from "moment";

export class Transaction extends Component {
  state = { transacData: [] };

  componentDidMount = () => {
    Axios.get("http://localhost:8080/gettransaction")
      .then(result => {
        this.setState({ transacData: result.data });
        console.log("componentDidMount service");
      })
      .catch(err => {
        console.log(err);
      });
  };

    render() {

        const columns = [
            {
                title: 'Provider Name',
                dataIndex: 'provider',
                key: 'provider',
                render: text => <a style={{ color: "black" }}>{text}</a>,
            },
            {
                title: 'Customer Name',
                dataIndex: 'customer',
                key: 'customer',
                render: text => <a style={{ color: "black" }}>{text}</a>,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <span>
                        {status.map(tag => {
                            let color = 'blue';
                            if (tag === 'complete') {
                                color = 'green';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },

        ];

        let data = this.state.transacData.map(trans => ({ 
            customer: trans.customer_Name,
            provider: trans.provider_Name,
            date: moment(trans.createdAt.toString()).format('lll'),
            status: trans.status === 'Accept' ? [trans.status] : ['Accept', trans.status]
        }));

    // const data = [
    //     {
    //         key: '1',
    //         date: '1/18/2020',
    //         customer: 'John Brown',
    //         province: 'Brown John',
    //         amount: 300,
    //         detial: "care dog",
    //         status: ['accept'],
    //     },
    //     {
    //         key: '2',
    //         date: '1/19/2020',
    //         customer: 'John Brown',
    //         province: 'Brown John',
    //         amount: 700,
    //         detial: "care dog",
    //         status: ['accept', 'complete'],
    //     },
    //     {
    //         key: '3',
    //         date: '1/19/2020',
    //         customer: 'John Brown',
    //         province: 'Brown John',
    //         amount: 500,
    //         detial: "care cat",
    //         status: ['accept'],
    //     },
    // ];

    return (
      <div className={style.containerHistory}>
        <Row className={style.adminview}>
          <div style={{height:'20px'}}></div>
          <span>
            <Table columns={columns} dataSource={data} />
          </span>
        </Row>
      </div>
    );
  }
}

export default Transaction;
