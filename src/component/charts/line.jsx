import React from 'react';
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts/lib/echarts';
import { Card } from 'antd';
import './line.css'
import '../card.less'
import { lineOption } from '../../config/lineChartConfig'  // 折线图配置项

/**
 * @function 折线图
 */

export default class Map extends React.PureComponent {
  constructor(props) {
    super()
  }

  clickEchartsPie = (e) => {
      console.log('e', e)
  }

  onclick = {
    'click': this.clickEchartsPie.bind(this)
  }

  render() {
    return (
      <div>
        <Card title='折线图' bordered={false} style={{ width: '100%' }}  >
          <ReactEcharts
            echarts={echarts}
            option={lineOption}
            onEvents={this.onclick}
          />
        </Card>
      </div>
    )
  }
}


