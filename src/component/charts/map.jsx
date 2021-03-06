import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import { Card } from 'antd';
import '../card.less'
import "./line.less";
import {getMapOption} from '../../config/mapConfig'

const dynasty = ['唐', '宋', '元', '明', '清']

export default class Map extends React.PureComponent {

  clickEchartsPie = (e) => {
    if (!dynasty.includes(e.name)) {
      this.props.setCurrent(e.name)
      console.log('e',e)
    }
  }

  onclick = {
    'click': this.clickEchartsPie.bind(this)
  }

  render() {
    const { heatMapInfo } = this.props
    const mapOption = getMapOption(heatMapInfo)
    console.log('mapOption', mapOption)
    return (
      <div className="heat-map" style={{ height: "450px" }}>
        <Card title="地图" bordered={false} style={{ width: "100%" }}>
          <ReactEcharts
            echarts={echarts}
            option={mapOption}
            onEvents={this.onclick}
            style = {{
              height: "400px",
            }}
          />
        </Card>
      </div>
    );
  }
}
