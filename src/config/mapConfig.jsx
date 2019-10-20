let mapData1 = [],
  mapData2 = [],
  mapData3 = [],
  mapData4 = [],
  mapData5 = [];
let theMap = {
  baseOption: {
    timeline: {
      // y: 0,
      axisType: 'category',
      // realtime: false,
      loop: false,
      data: ['唐', '宋', '元', '明', '清'],
      autoPlay: false,
      playInterval: 1000,//循坏的时间
    },
  },

  options: [
    {
      title: { text: '唐代（714年）地图' },

      geo: {
        map: 'tang',
        label: {
          emphasis: {
            show: true,
            color: '#666666',   //文字颜色
            fontFamily: 'monospace'
          },
          regions: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'red' // 0% 处的颜色
                }, {
                  offset: 1, color: 'blue' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }

        },

        center: [113.97, 36],
        itemStyle: {
          normal: {
            areaColor: '#efefef',
            borderColor: '#e1e1e1'
          },
          emphasis: {
            areaColor: '#cbcbcb',
          }
        },

      },
      visualMap: { //用于开启自定义的视觉颜色条框
        show: true,
        min: 0,
        max: 200,
        calculable: true,//如果开启，将会支持手动拖拽更改颜色
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        },
        top: 20,

      },
      series: [{
        name: "官员分布密度",
        type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
        coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
        data: mapData1,
        pointSize: 4,//显示点的大小
        blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        },
        minOpacity: 0,               //最小的透明度，在地理坐标系(coordinateSystem: 'geo')上有效。
        maxOpacity: 0.8,

      }]

    },

    {
      title: { text: '宋朝（993年）地图' },
      geo: {
        map: 'song',
        label: {
          emphasis: {
            show: true,
            color: '#666666',  //文字颜色
            fontFamily: 'monospace'
          }
        },

        center: [113.97, 28],
        itemStyle: {
          normal: {
            areaColor: '#efefef',
            borderColor: '#e1e1e1'
          },
          emphasis: {
            areaColor: '#cbcbcb',
          }
        }
      },
      visualMap: { //用于开启自定义的视觉颜色条框
        show: true,
        min: 0,
        max: 200,
        calculable: true,//如果开启，将会支持手动拖拽更改颜色
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        },
        top: 20
      },
      series: [{
        name: "官员分布密度",
        type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
        coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
        data: mapData2,
        pointSize: 10,//显示点的大小
        blurSize: 11, //模糊显示点  其放大倍数越高，显示点的颜色越浅
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        },
        minOpacity: 0,               //最小的透明度，在地理坐标系(coordinateSystem: 'geo')上有效。
        maxOpacity: 0.8,
        z: 0
      }]
    },

    {

      title: { text: '元朝顺元年（1330年）地图' },
      geo: {
        map: 'yuan',
        label: {
          emphasis: {
            show: true,
            color: '#666666',  //文字颜色
            fontFamily: 'monospace'
          }
        },

        center: [105, 36],  //x越大越左
        itemStyle: {
          normal: {
            areaColor: '#efefef',
            borderColor: '#e1e1e1'
          },
          emphasis: {
            areaColor: '#cbcbcb',
          }
        }
      },
      visualMap: { //用于开启自定义的视觉颜色条框
        show: true,
        min: 0,
        max: 200,
        calculable: true,//如果开启，将会支持手动拖拽更改颜色
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        },
        top: 20
      },
      series: [{
        name: "官员分布密度",
        type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
        coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
        data: mapData3,
        pointSize: 4,//显示点的大小
        blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      }]
    },

    {

      title: { text: '明朝（1402-1424年）地图' },
      geo: {
        map: 'ming',
        label: {
          emphasis: {
            show: true,
            color: '#666666',  //文字颜色
            fontFamily: 'monospace'
          }
        },


        center: [110, 33],
        itemStyle: {
          normal: {
            areaColor: '#efefef',
            borderColor: '#e1e1e1'
          },
          emphasis: {
            areaColor: '#cbcbcb',
          }
        }
      },
      visualMap: { //用于开启自定义的视觉颜色条框
        show: true,
        min: 0,
        max: 200,
        calculable: true,//如果开启，将会支持手动拖拽更改颜色
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        },
        top: 20
      },
      series: [{
        name: "官员分布密度",
        type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
        coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
        data: mapData4,
        pointSize: 4,//显示点的大小
        blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      }]
    },

    {
      title: { text: '清朝（1820年）地图' },
      geo: {
        map: 'qing',
        label: {
          emphasis: {
            show: true,
            color: '#666666',  //文字颜色
            fontFamily: 'monospace'
          }
        },

        center: [108, 36],  //h越大越低
        itemStyle: {
          normal: {
            areaColor: '#efefef',
            borderColor: '#e1e1e1'
          },
          emphasis: {
            areaColor: '#cbcbcb',
          }
        }
      },
      visualMap: { //用于开启自定义的视觉颜色条框
        show: true,
        min: 0,
        max: 200,
        calculable: true,//如果开启，将会支持手动拖拽更改颜色
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        },
        top: 20
      },
      series: [{
        name: "官员分布密度",
        type: 'heatmap',//类型为热力图  //设置为scatter才会显示文字提示
        coordinateSystem: 'geo',//采用的坐标系（地理坐标系）
        data: mapData5,
        pointSize: 4,//显示点的大小
        blurSize: 6, //模糊显示点  其放大倍数越高，显示点的颜色越浅
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      }]
    }
  ]
}


export default theMap;