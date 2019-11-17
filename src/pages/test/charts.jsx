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
  reqAddressName,
  reqAddressYear
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
    this.state = {
      currentClickProvince: '',
      currentClickYear:'',
      addressTableInfo: [],
      yearTableInfo: [],
      heatMapInfo:[[],[],[],[],[]]
    }
  }

  setCurrentClickProvince = (name) => {
    // 输出点击的地名
    const url = getAddressName(name)
    console.log('name ', url)
    const res = reqAddressName(url)
    this.setState(() => ({ currentClickProvince: name}))

    res.then(response => {
      console.log('response', response)
      let data = []
      let temp, oneInfo;
      for (let i in response) {
        temp = response[i]
        oneInfo = { city: temp.city, key: temp.id, id: temp.id, firstyear: temp.firstyear, name: temp.chName, lastyear: temp.lastyear, office_name: temp.office_name, office_address: temp.office_address }
        data.push(oneInfo)
      }
      this.setState(() => ({ addressTableInfo: data}))
    })
  }
  setCurrentClickYear = (year) => {
    console.log('clickYear', year)
    const theYear = year.replace(/[^0-9]/ig, "")
    const res = reqAddressYear(theYear)
    this.setState({ currentClickYear: theYear,})

    res.then(response => {
      console.log('yearResponse', response)
      let data = []
      let temp, oneInfo;
      for (let i in response) {
        temp = response[i]
        oneInfo = { city: temp.city, key: temp.id, id: temp.id, firstyear: temp.firstyear, chName: temp.chName, lastyear: temp.lastyear, office_name: temp.office_name, office_address: temp.office_address }
        data.push(oneInfo)
      }
      this.setState(() => ({ yearTableInfo: data }))
    })
  }

  componentDidMount() {
    let heatMapInfo = new Array(5);

    // TODO: 缓存优化，IndexedDB，然后读取并注册热力地图，减少服务器请求
    // 这里写 并发请求服务器会崩掉 所以,挨个请求
    (async () => {
      console.log('heatMapInfo', heatMapInfo)
      // heatMapInfo[0] = convertData(await reqHeatMapTang())
      heatMapInfo[1] = convertData(await reqHeatMapSong())
      // heatMapInfo[2] = convertData(await reqHeatMapYuan())
      // heatMapInfo[3] = convertData(await reqHeatMapMing())
      // heatMapInfo[4] = convertData(await reqHeatMapQing())
      console.log('heatMapInfo', heatMapInfo)
      this.setState({ heatMapInfo})
    })();

  }

  render() {
    return (
      <React.Fragment>
        <div style={{ float: 'left', overflow: 'hidden', width: '50% ' }}>
            
          <Line setCurrentClickYear={this.setCurrentClickYear}/>
          {/* <Suspense fallback={'loading'} > */}
          <Map setCurrent={this.setCurrentClickProvince} heatMapInfo={this.state.heatMapInfo} />
          {/* </Suspense> */}
        </div>
        <div style={{ float: 'left', width: '50%' }}>
          <AppointmentForm 
            clickProvince={this.state.currentClickProvince}
            tableInfo={this.state.addressTableInfo}
  
          />
          {/* <OfficialJobForm
            mpName={this.state.mpName} 
            /> */}
          <OfficialJobForm 
            ClickYear={this.state.currentClickYear}
            tableInfo={this.state.yearTableInfo}
          />
        </div>
        <div>
          {/* <PeopleRelationship /> */}
        </div>
        <div style={{ clear: 'both' }}> </div>
      </React.Fragment>

    )
  }
}