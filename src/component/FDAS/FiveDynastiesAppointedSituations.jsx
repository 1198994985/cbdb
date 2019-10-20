import React,{Component} from 'react'
import './FiveDynastiesAppointedSituations.css'
import {Card, Radio} from 'antd'
import {isInferredPredicate, isLabeledStatement} from "@babel/types";
import '../card.less'
import { Table, Divider, Tag } from 'antd';
import province from '../../config/dynastyProvince.jsx'


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
/**
 * 获取省份对应的ajax请求地址
 * @param {string} str2 
 * @return {string} 返回地址
 */
const getAddressName = (name) => {
    let address;
    if (province.tang.includes(name)) {
      address = "/address?addressName_tang=" + name
    } else if (province.song.includes(name)) {
      address = "/address?addressName_song=" + name
    } else if (province.yuan.includes(name)) {
      address = "/address?addressName_yuan=" + name
    } else if (province.ming.includes(name)) {
      address = "/address?addressName_ming=" + name
    } else if (province.qing.includes(name)) {
      address = "/address?addressName_qing=" + name
    }

    console.log(`${name} 对应的地址为: ${address}`)
    return address
}
export default class FiveDynastiesAppointedSituations extends Component{
    // handleClickSelect = () => {
    //     let select1 = $("#select1 option:selected")  //获取选中的项
    //     let select2 = $("#select2 option:selected")
    //     let str = $("#head").html()
    //     let str2 = str.substring(0, str.length - 2)
    //     let address

    //     let {tempState,handleSetState}=this.props
    // address = getAddressName(str2)
   
    //     $.ajax({
    //         type: "get",
    //         dataType: "json",//数据格式
    //         url: address,  //请求地址

    //         success: function (msg) {
    //             console.log('加载表格')

    //             $("#info  tr:not(:first)").empty("")  //清空表

    //             for (let i = 0; i < msg.length; i++) {
    //                 let tr = ""
    //                 let n = i + 1
    //                 if (select1.text() === "官职名" && msg[i]['office_name'] === select2.text()) {
    //                     console.log("筛选了官职名：" + select2.text())
    //                     tr = '<td>' + n + '</td>' +
    //                         '<td name = "chName1"  style="text-decoration:underlinecursor:pointercolor: dodgerblue" alt="查询详情" title="查询详情">' + msg[i]['chName'] + '</td>' +
    //                         '<td>' + msg[i]['office_name'] + '</td>' +
    //                         '<td>' + msg[i]['city'] + '</td>' +
    //                         '<td>' + msg[i]['firstyear'] + '</td>' +
    //                         '<td>' + msg[i]['lastyear'] + '</td>'
    //                     $("#info").append('<tr>' + tr + '</tr>')
    //                 }

    //                 else if (select1.text() === '就职地' && msg[i]['city'] === select2.text()) {
    //                     console.log("筛选了就职地：" + select2.text())
    //                     tr = '<td>' + n + '</td>' +
    //                         '<td name = "chName1"  style="text-decoration:underlinecursor:pointercolor: dodgerblue" alt="查询详情" title="查询详情">' + msg[i]['chName'] + '</td>' +
    //                         '<td>' + msg[i]['office_name'] + '</td>' +
    //                         '<td>' + msg[i]['city'] + '</td>' +
    //                         '<td>' + msg[i]['firstyear'] + '</td>' +
    //                         '<td>' + msg[i]['lastyear'] + '</td>'
    //                     $("#info").append('<tr>' + tr + '</tr>')
    //                 }
    //             }
    //         },
    //         error: function (msg) {
    //             alert('筛选请求失败')
    //         }
    //     })


    //     let _this = this
    //     $("#info").on("click", "td[name=chName1]", function () {
    //         let chName1 = $(this).html()
    //         tempState['mpName']=chName1
    //         handleSetState(tempState)
    //         //_this.setState({mpName: chName1})

    //         if (tempState.mpName !== " ") {
    //             tempState['mPerson']={}
    //             tempState['isLoaded']=false
    //             tempState['isInput']=true
    //             handleSetState(tempState)
    //              /*_this.setState({
    //                     mPerson: {},
    //                     isLoaded: false,
    //                     isInput: true
    //                 }*/,

    //                     //这里打印的是最新的state值
    //                     console.log(tempState.isInput)
    //                     if (tempState.isInput) {
    //                         if (tempState.isradio === 1) {
    //                             const url = "/person?mpName=" + chName1 + "&dataType=1"
    //                             console.log(url)
    //                             let count = tempState.maxRelationValue
    //                             setTimeout(() => {
    //                                 axios.get(url)
    //                                     .then(response => {
    //                                         const result = response.data
    //                                         if (result['err'] === 1) {
    //                                             alert("数据库没有该历史人物的数据,请重新输入")
    //                                         } else {
    //                                             for (let i = 0; i < result.assocPersons.length; i++) {
    //                                                 if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
    //                                                     count = parseInt(result.assocPersons[i].assocCode, 10)
    //                                                 }
    //                                             }
    //                                             tempState['mPerson']=response.data
    //                                             tempState['isLoaded']=true
    //                                             tempState['maxRelationValue']=count
    //                                             handleSetState(tempState)
    //                                            /* _this.setState({
    //                                                 mPerson: response.data,
    //                                                 isLoaded: true,
    //                                                 maxRelationValue: count
    //                                             })*/
    //                                         }
    //                                     })
    //                                     .catch(error => {
    //                                         // debugger
    //                                         alert('对不起！数据库断开连接handleClickSelect6.1')
    //                                         tempState['isInput']=false
    //                                         handleSetState(tempState)
    //                                        /* _this.setState({
    //                                             isInput: false
    //                                         })*/
    //                                     })
    //                             }, 1000)
    //                         }

    //                         else if (tempState.isradio === 2) {
    //                             const url = "/person?mpName=" + chName1 + "&dataType=2"
    //                             let count = tempState.maxRelationValue
    //                             console.log(url)
    //                             setTimeout(() => {
    //                                 axios.get(url)
    //                                     .then(response => {
    //                                         const result = response.data
    //                                         for (let i = 0; i < result.kinPersons.length; i++) {
    //                                             if (count < parseInt(result.kinPersons[i].kinCode, 10)) {
    //                                                 count = parseInt(result.kinPersons[i].kinCode, 10)
    //                                             }
    //                                         }
    //                                         if (result['err'] === 1) {
    //                                             alert("数据库没有该历史人物的数据,请重新输入")
    //                                         }

    //                                         else {
    //                                             tempState['mPerson']=response.data
    //                                             tempState['isLoaded']=true
    //                                             tempState['maxRelationValue']=count
    //                                             handleSetState(tempState)
    //                                           /*  _this.setState({
    //                                                 mPerson: response.data,
    //                                                 isLoaded: true,
    //                                                 maxRelationValue: count
    //                                             })*/
    //                                         }
    //                                     })
    //                                     .catch(error => {
    //                                         // debugger
    //                                         alert('对不起！数据库断开连接handleClickSelect6.2')
    //                                         tempState['isInput']=false
    //                                         handleSetState(tempState)
    //                                         /*_this.setState({
    //                                             isInput: false
    //                                         })*/
    //                                     })
    //                             }, 1000)

    //                         }
    //                         else if (tempState.isradio === 3) {
    //                             let result = {}
    //                             const url_1 = "/person?mpName=" + chName1 + "&dataType=1"
    //                             const url_2 = "/person?mpName=" + chName1 + "&dataType=2"
    //                             let count = tempState.maxRelationValue
    //                             axios.get(url_1)
    //                                 .then(response => {
    //                                     result = response.data
    //                                     if (result['err'] === 1) {
    //                                         alert("数据库没有该历史人物的数据,请重新输入")
    //                                     } else {
    //                                         for (let i = 0; i < result.assocPersons.length; i++) {
    //                                             if (count < parseInt(result.assocPersons[i].assocCode, 10)) {
    //                                                 count = parseInt(result.assocPersons[i].assocCode, 10)
    //                                             }
    //                                         }
    //                                     }
    //                                 })
    //                                 .catch(error => {
    //                                     // debugger
    //                                     console.log(error)
    //                                     alert('对不起！数据库断开连接handleClickSelect6.3')
    //                                     tempState['isInput']=false
    //                                     handleSetState(tempState)
    //                                     /*_this.setState({
    //                                         isInput: false
    //                                     })*/
    //                                 })
    //                             setTimeout(() => {
    //                                 axios.get(url_2)
    //                                     .then(response => {
    //                                         const result_2 = response.data
    //                                         for (let i = 0; i < result_2.kinPersons.length; i++) {
    //                                             if (count < parseInt(result_2.kinPersons[i].kinCode, 10)) {
    //                                                 count = parseInt(result_2.kinPersons[i].kinCode, 10)
    //                                             }
    //                                         }
    //                                         $.extend(true, result, result_2)
    //                                         tempState['mPerson']=result
    //                                         tempState['isLoaded']=true
    //                                         tempState['maxRelationValue']=count
    //                                         handleSetState(tempState)
    //                                         /*_this.setState({
    //                                             mPerson: result,
    //                                             isLoaded: true,
    //                                             maxRelationValue: count
    //                                         })*/
    //                                     })
    //                                     .catch(error => {
    //                                         // debugger
    //                                         console.log(error)
    //                                         alert('对不起！数据库断开连接handleClickSelect6.4')
    //                                         tempState['isInput']=false
    //                                         handleSetState(tempState)
    //                                        /* _this.setState({
    //                                             isInput: false
    //                                         })*/
    //                                     })
    //                             }, 1000)
    //                         }
    //                         else {
    //                             alert("请求失败")
    //                         }
    //                     }

    //         }
    //     })
    // }
    render(){

        return (
            <div className="info-div1">
                <Card title="五朝历史人物任命情况表" style={{height: '377px'}}>

                    <div className="select-div">
                        <select name="select1" id="select1" className="select-style">
                            <option value="0">--请选择--</option>
                            <option value="1">官职名</option>
                            <option value="2">就职地</option>
                        </select>

                        <select name="select2" id="select2" className="select-style">
                            <option value="4">--请选择--</option>
                        </select>

                        <button type="button" className="button-style"
                                onClick={this.handleClickSelect}>筛选
                        </button>

                    </div>

                    {/* <h2 id="head">信息</h2> */}
                    <div className="table-div">
                        {/* <table className="table" id='info'>
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>人名</th>
                                <th>官职名</th>
                                <th>就职地</th>
                                <th>始年</th>
                                <th>终年</th>
                            </tr>
                            </thead>
                        </table> */}


                        <Table dataSource={data}>


    <Column title="序号" dataIndex="age1" key="age1" />
    <Column title="官职名" dataIndex="address2" key="address2" />
    <Column title="就职地" dataIndex="address3" key="address3" />
    <Column title="始年" dataIndex="address4" key="address4" />
    <Column title="始年" dataIndex="address5" key="address5" />
   
  </Table>
                    </div>
                </Card>
            </div>
        )
    }
}



