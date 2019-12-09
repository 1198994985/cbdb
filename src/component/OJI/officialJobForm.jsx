import React, { Component } from 'react'
import './index.css'
import { Card, Table, Select, Button } from 'antd'
import '../card.less'

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const info = [
    {
        "id": 2727,
        "chName": "賀澄",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "典史",
        "office_address": "蠡縣",
        "city": "[未詳]",
        "office_x_coord": 115.5747,
        "office_y_coord": 38.490063
    },
    {
        "id": 4440,
        "chName": "林光重",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "教諭",
        "office_address": "武義",
        "city": "[未詳]",
        "office_x_coord": 119.802269,
        "office_y_coord": 28.895449
    },
    {
        "id": 5558,
        "chName": "洪銮",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "經歷",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 7140,
        "chName": "羅時",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "同知",
        "office_address": "溫州府",
        "city": "[未詳]",
        "office_x_coord": 120.65322113,
        "office_y_coord": 28.018291473
    },
    {
        "id": 7468,
        "chName": "慕容希古",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "縣丞",
        "office_address": "稷山",
        "city": "[未詳]",
        "office_x_coord": 110.978828,
        "office_y_coord": 35.602161
    },
    {
        "id": 7551,
        "chName": "任鮑奇",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "縣丞",
        "office_address": "零陵",
        "city": "[未詳]",
        "office_x_coord": 111.612564,
        "office_y_coord": 26.210339
    },
    {
        "id": 8786,
        "chName": "郭荣",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "縣丞",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 10256,
        "chName": "崔景隆",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "訓導",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 13726,
        "chName": "吳成",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "知縣",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 14491,
        "chName": "林釗",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "知縣",
        "office_address": "金華",
        "city": "[未詳]",
        "office_x_coord": 119.649918,
        "office_y_coord": 29.104712
    },
    {
        "id": 14594,
        "chName": "樊軒",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "知縣",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 15231,
        "chName": "蕭良宜",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "知縣",
        "office_address": "[未詳]",
        "city": "[未詳]"
    },
    {
        "id": 15655,
        "chName": "關瑜",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "知縣",
        "office_address": "寧晉",
        "city": "[未詳]",
        "office_x_coord": 114.91539764,
        "office_y_coord": 37.621086121
    },
    {
        "id": 17698,
        "chName": "莊珪",
        "firstyear": "1490",
        "lastyear": "未詳",
        "office_name": "主簿",
        "office_address": "[未詳]",
        "city": "[未詳]"
    }
]


export default class AppointmentForm extends React.PureComponent {

    state = {
        leftSelectorValue: '0',
        RightSelectorValue: '0',
        tableInfoByOffice: {},
        tableInfoByCit: {},
        citySelectorList: [],
        OfficerSelectorList: [],

    }
    /**
     * 选择器回调函数
     * @param {string} value 
     */
    leftSelectorChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ leftSelectorValue: value })
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ RightSelectorValue: value })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.tableInfo !== prevState.tableInfo) {
            console.log('test')

            let tableInfoByCity = {}
            let tableInfoByOffice = {}
            let citySelectorList = []
            let OfficerSelectorList = []
            const { tableInfo } = nextProps
            for (let i in tableInfo) {
                let temp = tableInfo[i]
                if (!tableInfoByCity[temp.city]) {
                    tableInfoByCity[temp.city] = []
                    citySelectorList.push(temp.city)
                }
                if (!tableInfoByOffice[temp.office_name]) {
                    tableInfoByOffice[temp.office_name] = []
                    OfficerSelectorList.push(temp.office_name)
                }
                tableInfoByCity[temp.city].push(temp)
                tableInfoByOffice[temp.office_name].push(temp)
            }
            OfficerSelectorList = Array.from(new Set(OfficerSelectorList))
            console.log('five', {
                tableInfoByOffice,
                tableInfoByCity,
                citySelectorList,
                OfficerSelectorList
            })
            return {
                tableInfoByOffice,
                tableInfoByCity,
                citySelectorList,
                OfficerSelectorList,
                tableInfo
            }
        }
        return;
    }

    handleSearch = () => {

    }
    render() {
        const { ClickYear, tableInfo } = this.props
        const { citySelectorList, OfficerSelectorList, tableInfoByCity, tableInfoByOffice } = this.state
        const { leftSelectorValue, RightSelectorValue } = this.state
        let RightSelector, nowTableInfo
        if (leftSelectorValue === '1' || leftSelectorValue === '2') {
            RightSelector = (leftSelectorValue === '1' ? OfficerSelectorList : citySelectorList).map((item, index) => {
                return <Option value={item} key={item + index}>{item}</Option>
            })
        }
        if (leftSelectorValue === '0' || RightSelectorValue === '0') {
            nowTableInfo = tableInfo
        } else if (leftSelectorValue !== '0' && RightSelectorValue !== '0') {
            nowTableInfo = (leftSelectorValue === '1' ? tableInfoByOffice : tableInfoByCity)[RightSelectorValue]
        }

        return (
            <div className="info-div1">
                <Card title={ClickYear.length ? ClickYear + '年 人物任命情况表' : "年份 人物任命情况表"}>
                    <div className="select-div">
                        <Select defaultValue="0" onChange={this.leftSelectorChange} >
                            <Option value="0" disabled>
                                --就职城市--
              </Option>
                            <Option value="1" >
                                官职名
              </Option>
                            <Option value="2" >
                                就职地
              </Option>
                        </Select>
                        <Select defaultValue="0" onChange={this.handleChange} >
                            <Option value="0" disabled>
                                --请选择--
              </Option>
                            {
                                RightSelector
                            }

                        </Select>

                        <Button type="primary" onClick={this.handleSearch}>筛选</Button>
                    </div>
                    <div className="table-div">
                        <Table dataSource={nowTableInfo}
                            pagination={{ defaultCurrent: 1, pageSize: 6, hideOnSinglePage: true, total: nowTableInfo ? nowTableInfo.length:1 }}
                            rowSelection={{}}
                        >
                            <Column title="序号" dataIndex="id" key="id" />
                            <Column title="姓名" dataIndex="chName" key="name" />
                            <Column title="city" dataIndex="city" key="city" />
                            <Column title="官职名" dataIndex="office_name" key="office_name" />
                            <Column title="就职地" dataIndex="office_address" key="office_address" />
                            <Column title="始年" dataIndex="firstyear" key="firstyear" />
                            <Column title="终年" dataIndex="lastyear" key="lastyear" />
                        </Table>
                    </div>

                </Card>
            </div>
        )
    }
}



