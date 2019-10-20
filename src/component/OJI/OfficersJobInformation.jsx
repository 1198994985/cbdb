import React, { Component } from 'react'
import './OfficersJobInformation.css'
import { Card, Radio } from 'antd'
import '../card.less'

import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
const data = [
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
];


export default class OfficersJobInformation extends Component {

    // handleClick2 = (e) => {
    //     let index = e.target.value
    //     let name = this.props.mpName
    //     if (index === 'a') {
    //         const address = "/person?mpName=" + name + "&dataType=3" //任职信息

    //         $.ajax({
    //             type: "get",
    //             dataType: "json",//数据格式
    //             url: address,  //请求地址

    //             success: function (msg) {

    //                 if (msg['err'] === 1 || !msg['postPersons']) {
    //                     console.log("数据库没有该历史人物的任职数据,请重新输入")
    //                     $("#info1  tr:not(:first)").empty("")
    //                     $("#head2").html("")
    //                     $("#head2").html(name + "任职信息")
    //                     $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头


    //                     let tr = '<td>无数据</td>' +
    //                         '<td>无数据</td>' +
    //                         '<td>无数据</td>' +
    //                         '<td>无数据</td>' +
    //                         '<td>无数据</td>'
    //                     $("#info1").append('<tr>' + tr + '</tr>')
    //                 }

    //                 else {
    //                     $("#info1  tr:not(:first)").empty("")
    //                     $("#head2").html("")
    //                     $("#head2").html(name + "任职信息")
    //                     $('#info1 tr:eq(0) th:eq(1)').html("上任时间")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(2)').html("调任时间")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(3)').html("官职名")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(4)').html("任官地点")//更换表头

    //                     let msg1 = msg['postPersons']

    //                     for (let i = 0; i < msg1.length; i++) {
    //                         let tr = ""
    //                         let n = i + 1
    //                         tr = '<td>' + n + '</td>' +
    //                             /*'<td>'+msg1[i]['officeId']+'</td>' +*/
    //                             '<td>' + msg1[i]['firstYear'] + '</td>' +
    //                             '<td>' + msg1[i]['lastYear'] + '</td>' +
    //                             '<td>' + msg1[i]['officeName'] + '</td>' +
    //                             /*'<td  id="m1" href="http://localhost:3000/#/simple-force-chart?name="+name>'+msg1[i]['addressName']+'</td>'*/
    //                             '<td>' + msg1[i]['addressName'] + '</td>'
    //                         $("#info1").append('<tr>' + tr + '</tr>')
    //                     }
    //                 }
    //             },
    //             error: function (msg) {
    //                 alert('对不起！数据库断开连接handleClick2(e)3.1')
    //             }
    //         })

    //     }
    //     else if (index === 'b') {  //同年信息
    //         let year = $("#id4").html()
    //         if (year === '无数据') {
    //             $("#info1  tr:not(:first)").empty("")
    //             $("#head2").html("")
    //             $("#head2").html(name + "同年当官历史人物")
    //             $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
    //             $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
    //             $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
    //             $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头


    //             let tr = '<td>无数据</td>' +
    //                 '<td>无数据</td>' +
    //                 '<td>无数据</td>' +
    //                 '<td>无数据</td>' +
    //                 '<td>无数据</td>'
    //             $("#info1").append('<tr>' + tr + '</tr>')
    //         }
    //         else {
    //             let arr = year.split(":")
    //             let arr1 = arr[1].split("(")
    //             let address = "/address?firstYear=" + arr1[0]

    //             $.ajax({
    //                 type: "get",
    //                 dataType: "json",//数据格式
    //                 url: address,  //请求地址

    //                 success: function (msg) {
    //                     $("#info1  tr:not(:first)").empty("")
    //                     $("#head2").html("")
    //                     $("#head2").html(name + "同年当官历史人物")
    //                     $('#info1 tr:eq(0) th:eq(1)').html("姓名")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(2)').html("就职地")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(3)').html("出生地")//更换表头
    //                     $('#info1 tr:eq(0) th:eq(4)').html("官职名")//更换表头

    //                     for (let i = 0; i < msg.length; i++) {
    //                         let tr = ""
    //                         let n = i + 1

    //                         tr = '<td>' + n + '</td>' +
    //                             /*'<td>'+msg1[i]['officeId']+'</td>' +*/
    //                             '<td>' + msg[i]['chName'] + '</td>' +
    //                             '<td>' + msg[i]['office_address()'] + '</td>' +
    //                             '<td>' + msg[i]['city'] + '</td>' +
    //                             '<td>' + msg[i]['office_name'] + '</td>'
    //                         $("#info1").append('<tr>' + tr + '</tr>')
    //                     }
    //                 },
    //                 error: function (msg) {
    //                     alert('对不起！数据库断开连接handleClick2(e)3.2')
    //                 }
    //             })
    //         }
    //     }

    //     else {
    //         console.log("handleClick2:error")
    //     }
    // }
    render() {
        return (
            <div className="info-div1">
                <Card title="官员任职信息表" style={{ height: '400px' }}>
                    <div>
                        <div>
                            <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: "8px" }}
                                onChange={this.handleClick2}>
                                <Radio.Button value="a">任职信息</Radio.Button>
                                <Radio.Button value="b">同年信息</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    {/* <h2 id="head2">任职信息</h2> */}
                    <div className="table-div">
                        {/* <table className="table" id='info1'>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>上任时间</th>
                                <th>调任时间</th>
                                <th>官职名</th>
                                <th>任官地点</th>
                            </tr>
                            </thead>
                        </table> */}

                        <Table dataSource={data}>


                            <Column title="序号" dataIndex="age1" key="age1" />
                            <Column title="上任时间" dataIndex="address2" key="address2" />
                            <Column title="调任时间" dataIndex="address3" key="address3" />
                            <Column title="官职名" dataIndex="address4" key="address4" />
                            <Column title="任官地点" dataIndex="address5" key="address5" />

                        </Table>
                    </div>
                </Card>
            </div>
        )
    }
}
