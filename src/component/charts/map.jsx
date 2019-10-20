import React, {Component} from 'react';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import { Card } from 'antd';
import '../card.less'
import theMap from '../../config/mapConfig' 


 
export default class Map extends Component {
  render() {
    return (
      <div>
      <Card  title='地图'  bordered={false} style={{ width: '100%' }} >

        <ReactEcharts
          echarts={echarts}
          option={theMap}
        /> 
      </Card>
        
      </div>
    )
  }
}
