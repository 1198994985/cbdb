
import React, { Component, lazy, Suspense } from 'react';
import Line from '../../component/charts/line'
import Map from '../../component/charts/map'
import FiveDynastiesAppointedSituations from '../../component/FDAS/FiveDynastiesAppointedSituations'
import OfficersJobInformation from '../../component/OJI/OfficersJobInformation'
import {
  reqHeatMapTang,
  reqHeatMapSong,
  reqHeatMapYuan,
  reqHeatMapMing,
  reqHeatMapQing
} from '../../request/ajax'

// const Map = lazy( () => import('../../component/charts/map') )

// 一切烂代码都不是fb写的，fb最强
let convertData = (nb) => {
  let res = []
  let dataObject = nb
  for (let i = 0; i < dataObject.length; i++) {
    let concatArray = []
    concatArray.push(dataObject[i]["coord"][0])
    concatArray.push(dataObject[i]["coord"][1])
    concatArray.push(dataObject[i]["coord"][2])
    res.push({
      name: "coord",
      value: concatArray
    })
  }
  return res
}

/**
 * @class 主页面+路由
 */
export default class Charts extends Component {
  constructor(props) {

    super(props)

    this.state = {

      tang: {},
      song: {},
      yuan: {},
      ming: {},
      qing: {},
      currentClick: ''
      // mpName: " ", // 没有必要使用这么多状态
      // mPerson: {},
      // isInput: false,
      // isLoaded: false,
      // isradio: 1,
      // maxRelationValue: 6,
      // relationValue: 5,
      // isChanged: false
    }
  }

  setCurrentClick = (name) => {
    // name 鼠标点击的省份

    // 输出点击的地名
    console.log(name)
    this.setState({ currentClick: name })
  }


  // handleSetState = (tempState)=>{
  //   let {mpName,mPerson,isInput,isLoaded,isradio,maxRelationValue,relationValue,isChanged}=tempState
  //   this.setState({
  //     mpName: mpName,
  //     mPerson: mPerson,
  //     isInput: isInput,
  //     isLoaded: isLoaded,
  //     isradio: isradio,
  //     maxRelationValue: maxRelationValue,
  //     relationValue: relationValue,
  //     isChanged: isChanged
  //   })
  // }


  componentDidMount() {

    // TODO: 缓存优化，IndexedDB，然后读取并注册热力地图，减少服务器请求

    // 这里写的有一点问题
    Promise.all([reqHeatMapTang(), reqHeatMapSong(), reqHeatMapYuan(), reqHeatMapMing(), reqHeatMapQing()])
      .then((result) => {
        let mapName = ['tang', 'song', 'yuan', 'ming', 'qing']
        result.map((item, index) => {
          console.log('map')
          this.setState({ [mapName[index]]: convertData(item) })
        })
      })


  }

  render() {
    return (
      <React.Fragment>
        <div style={{ float: 'left', overflow: 'hidden', width: '50% ' }}>
          <Line />
          {/* <Suspense fallback={'loading'} > */}
          <Map setCurrent={this.setCurrentClick} />
          {/* </Suspense> */}
        </div>
        <div style={{ float: 'left', width: '50%' }}>
          <FiveDynastiesAppointedSituations tempState={this.state} handleSetState={this.handleSetState} />
          <OfficersJobInformation mpName={this.state.mpName} />
        </div>
        <div style={{ clear: 'both' }}> </div>
      </React.Fragment>

    )
  }
}
