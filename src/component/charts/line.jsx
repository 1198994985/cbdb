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
function Line() {
  console.log('line render')
  return (
    <Card title='折线图' bordered={false} style={{ width: '100%' }}  >
      <ReactEcharts
        echarts={echarts}
        option={lineOption}
      />
    </Card>
  );
}
export default React.memo(Line)


