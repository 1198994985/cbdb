import echarts from 'echarts/lib/echarts';

// 柱状图
export let timeData = ['唐初', '670年', '720', '770年', '820年', '870年', '唐末',                       //618-622 668-672 718-722 768-772  818-822 868-872 903-907
'宋初', '1010年', '1060年', '1110年', '1160年', '1210年', '宋末',                //960-964 1010-1014 1060-1064 1110-1114 1160-1164 1210-1214 1275-1279
'元初', '1300年', '1330年', '元末',                                           //1271-1275 1300-1304 1330-1334 1364-1368
'明初', '1418年', '1468年', '1518年', '1568年', '1618年', '明末',                //1368-1372 1418-1422 1468-1472 1518-1522 1568-1572 1618-1622 1640-1644
'清初', '1690年', '1740年', '1790年', '1840年', '清末']  //x坐标                // 1636-1640 1690-1694 1740-1744 1790-1794 1840-1844 1908-1912

export let lineOption = {
  lineStyle:{
    normal:{
        color:'rgb(188,228,254)'
    }
},
areaStyle:{
    normal:{
       //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 

            offset: 0,
            color: 'rgba(199,222,228,0.39)'
        }, {
            offset: .34,
            color: 'rgba(179,216,255,0.25)'
        },{
            offset: 1,
            color: 'rgba(141,204,222,0.00)'
        }])

    }
},
  xAxis: {
    data: timeData,
    boundaryGap:false
  },
  yAxis: {
    name: '数量(个)',
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',  //当trigger为’item’时只会显示该点的数据，为’axis’时显示该列下所有坐标轴所对应的数据.
    axisPointer: {
      type: 'shadow',  //阴影式浮层
      label: {
        backgroundColor: '#6a7985'
      }
    },
    formatter: '人数:{c0}'
  },

  dataZoom: [// 这个dataZoom组件，若未设置xAxisIndex或yAxisIndex，则默认控制x轴。
    {
      type: 'slider',//这个 dataZoom 组件是 slider 型 dataZoom 组件（只能拖动 dataZoom 组件导致窗口变化）
      xAxisIndex: 0, //控制x轴
      fillerColor:'rgba(188,228,254,0.3)',
      borderColor:'rgba(188,228,254,0.9)',
      backgroundColor:"rgba(47,69,84,0)",
      /*start: 10, 	// 左边在 10% 的位置
                                    end: 60 	// 右边在 60% 的位置*/
    },
    /* {
                                     type: 'inside',//这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
                                     xAxisIndex: 0,//控制x轴
                                     start: 10,
                                     end: 60
                                 },*/
  ],
  series: [
    {
      name: 'scatter',
      type: 'line',
      areaStyle: {normal: {}},
      data: [61, 96, 137, 158, 190, 157, 96,
        40, 54, 114, 113, 154, 128, 151,
        107, 87, 67, 69,
        62, 56, 337, 467, 814, 445, 333,
        244, 220, 159, 197, 217, 244],
    itemStyle : {normal : {color:'#87cbde'},opacity: 0.8}

    }

  ],
  
}