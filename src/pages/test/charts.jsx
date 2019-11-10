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

    this.state = {

      tang: {},
      song: {},
      yuan: {},
      ming: {},
      qing: {},
      currentClickProvince: '',
      tableInfo: ''
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
    console.log('name ', url )
    const res = reqAddressName(url)

    res.then(response => {
      console.log('response', response)
      let data = []
      for (let i in response) {
        let temp = response[i]
        data.push({ key: temp.id,id:temp.id, firstyear: temp.firstyear, name: temp.chName, lastyear: temp.lastyear, office_name: temp.office_name, office_address: temp.office_address })
      }
      this.setState((prestate ) =>({ ...prestate, currentClickProvince: name, tableInfo: data  }))
      console.log('s', this.state.tableInfo)
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

    // // 这里写的有一点问题
    // Promise.all([reqHeatMapTang(),reqHeatMapSong(), reqHeatMapYuan(), reqHeatMapMing(), reqHeatMapQing() ]) // 
    //   .then((result) => {
    //     let mapName = ['tang', 'song', 'yuan', 'ming', 'qing']
    //     result.map((item, index) => {
    //       console.log('map')
    //       this.setState({ [mapName[index]]: convertData(item) })
    //     })
    //   })


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
          <AppointmentForm tempState={this.state} handleSetState={this.handleSetState} clickProvince={this.state.currentClickProvince} tableInfo={this.state.tableInfo} />
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