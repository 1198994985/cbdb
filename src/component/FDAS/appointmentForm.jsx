import React, { Component } from 'react'
import './appointmentForm.less'
import { Card, Table, Select, Button } from 'antd'
import '../card.less'

const { Column, ColumnGroup } = Table;
const { Option } = Select;

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
    const { clickProvince, tableInfo } = this.props
    const { citySelectorList, OfficerSelectorList, tableInfoByCity, tableInfoByOffice } = this.state
    const { leftSelectorValue, RightSelectorValue } = this.state
    let RightSelector,nowTableInfo
    if (leftSelectorValue === '1' || leftSelectorValue === '2') {
      RightSelector = (leftSelectorValue === '1' ? OfficerSelectorList : citySelectorList).map((item, index) => {
        return <Option value={item} key={item + index}>{item}</Option>
      })
    }
    if (leftSelectorValue === '0' || RightSelectorValue==='0') {
      nowTableInfo = tableInfo
    } else if (leftSelectorValue !== '0' && RightSelectorValue !== '0') {
      nowTableInfo = (leftSelectorValue === '1' ? tableInfoByOffice : tableInfoByCity)[RightSelectorValue]
    }

    return (
      <div className="info-div1">
        <Card title={clickProvince.length ? clickProvince + ' 人物任命情况表' : "地方 人物任命情况表"}>
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
              pagination={{ defaultCurrent: 1, pageSize: 6, hideOnSinglePage: true, total: nowTableInfo ? nowTableInfo.length : 1 }}
              rowSelection={{}}
            >
              <Column title="序号" dataIndex="id" key="id" />
              <Column title="姓名" dataIndex="name" key="name" />
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



