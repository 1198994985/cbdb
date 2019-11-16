import React, { Component, lazy, Suspense } from 'react';
import Line from '../../component/charts/line'
import Map from '../../component/charts/map'
import AppointmentForm from '../../component/FDAS/appointmentForm'
import OfficialJobForm from '../../component/OJI/officialJobForm'
import {
  reqHeatMapTang,
  reqHeatMapSong,
  reqHeatMapYuan,
  reqHeatMapMing,
  reqHeatMapQing,
  reqAddressName
} from '../../request/ajax'
import PeopleRelationship from "../../component/PR/PeopleRelationship";
import province from '../../config/dynastyProvince.jsx'

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
 * 获取省份对应的ajax请求地址
 * @param {string} name 待查询省份
 * @return {string} 返回地址
 */
const getAddressName = (name) => {
  let address;
  name = name.trim()
  if (province.tang.includes(name)) {
    address = "/address?addressName_tang=" + name
  } else if (province.song.includes(name)) {
    address = "/address?addressName_song=" + name
  } else if (province.yuan.includes(name)) {
    address = "/address?addressName_yuan=" + name
  } else if (province.ming.includes(name)) {
    address = "/address?addressName_ming=" + name
  } else if (province.qing.includes(name)) {
    address = "/address?addressName_qing=" + name
  }

  // console.log(`${name} 对应的地址为: ${address}`)
  return address
}

/**
 * @class 主页面+路由
 */
export default class Charts extends Component {
  constructor(props) {

    super(props)
    // 赶项目，先这么写。。。。，由于存储的是引用，所以不会造成过多的冗余
    this.state = {
      heatMaptang: {},
      heatMapSong: {},
      heatMapYuan: {},
      heatMapMing: {},
      heatMapQing: {},
      currentClickProvince: '',
      tableInfo:[],
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

  setCurrentClickProvince = (name) => {
    // 输出点击的地名
    const url = getAddressName(name)
    console.log('name ', url)
    const res = reqAddressName(url)

    res.then(response => {
      console.log('response', response)
      let data = []
      let temp, oneInfo;
      for (let i in response) {
        temp = response[i]
        oneInfo = { city: temp.city, key: temp.id, id: temp.id, firstyear: temp.firstyear, name: temp.chName, lastyear: temp.lastyear, office_name: temp.office_name, office_address: temp.office_address }
        data.push(oneInfo)
      }
      this.setState((prestate) => ({ currentClickProvince: name, tableInfo: data}))
    })
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
    // 这里写 并发请求服务器会崩掉 所以,挨个请求
    let mapName = ['heatMaptang', 'heatMapSong', 'heatMapYuan', 'heatMapMing', 'heatMapQing']
    reqHeatMapTang().then((res) => {
      this.setState({ [mapName[0]]: convertData(res) }, rest => {
        console.log('heatMapTang', this.state.heatMaptang)
      })
    })

    // this.setState({ [mapName[0]]: convertData(reqHeatMapSong()) })
    // this.setState({ [mapName[0]]: convertData(reqHeatMapYuan()) })
    // this.setState({ [mapName[0]]: convertData(reqHeatMapMing()) })
    // this.setState({ [mapName[0]]: convertData(reqHeatMapQing()) })

  }

  render() {
    return (
      <React.Fragment>
        <div style={{ float: 'left', overflow: 'hidden', width: '50% ' }}>
          <Line />
          {/* <Suspense fallback={'loading'} > */}
          <Map setCurrent={this.setCurrentClickProvince} />
          {/* </Suspense> */}
        </div>
        <div style={{ float: 'left', width: '50%' }}>
          <AppointmentForm tempState={this.state}
            handleSetState={this.handleSetState}
            clickProvince={this.state.currentClickProvince}
            tableInfo={this.state.tableInfo}
  
          />
          <OfficialJobForm mpName={this.state.mpName} />
        </div>
        <div>
          {/* <PeopleRelationship /> */}
        </div>
        <div style={{ clear: 'both' }}> </div>
      </React.Fragment>

    )
  }
}