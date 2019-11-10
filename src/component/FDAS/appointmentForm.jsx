import React, { Component } from 'react'
import './appointmentForm.less'
import { Card, Table, Select, Button } from 'antd'
import '../card.less'

const { Column, ColumnGroup } = Table;
const { Option } = Select;

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * 选择器回调函数
   * @param {string} value 
   */
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { clickProvince, tableInfo } = this.props
    return (
      <div className="info-div1">
        <Card title={clickProvince.length ? clickProvince + ' 人物任命情况表' : "五朝历史人物任命情况表"}>
          <div className="select-div">
            <Select defaultValue="0" onChange={this.handleChange} >
              <Option value="0" disabled>
                --请选择--
              </Option>
              <Option value="1">官职名</Option>
              <Option value="2">就职地</Option>
            </Select>
            {/* <Select defaultValue="4"  >
              <Option value="4" disabled>
                --请选择--
              </Option>

            </Select> */}
            <Button type="primary">筛选</Button>
          </div>
          <div className="table-div">
            <Table dataSource={tableInfo}
              pagination={{ defaultCurrent: 1, pageSize: 6, hideOnSinglePage: true, total: tableInfo.length }}
              rowSelection={{}}
            >
              <Column title="序号" dataIndex="id" key="id" />
              <Column title="姓名" dataIndex="name" key="name" />
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



