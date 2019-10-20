import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import { Card } from 'antd';
import '../card.less'
import theMap from '../../config/mapConfig'

const dynasty = ['唐', '宋', '元', '明', '清']

export default class Map extends Component {
  constructor(props) {
    super()
  }

  clickEchartsPie = (e) => {
    if (!dynasty.includes(e.name)) {
      this.props.setCurrent(e.name)
    }
  }

  onclick = {
    'click': this.clickEchartsPie.bind(this)
  }

  render() {
    return (
      <div>
        <Card title='地图' bordered={false} style={{ width: '100%' }} >
          <ReactEcharts
            echarts={echarts}
            option={theMap}
            onEvents={this.onclick}
          />
        </Card>
      </div>
    )
  }
}
