
import React, {Component, lazy, Suspense} from 'react';
import Line from '../../component/charts/line'
import Map from '../../component/charts/map'
import FiveDynastiesAppointedSituations from '../../component/FDAS/FiveDynastiesAppointedSituations'
import OfficersJobInformation from '../../component/OJI/OfficersJobInformation'
import {reqHeatMapTang,
  reqHeatMapSong,
  reqHeatMapYuan,
  reqHeatMapMing,
  reqHeatMapQing } from '../../request/ajax'

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


export default class Charts extends Component {
constructor(props) {
  super(props)
  this.state = {
    tang:{},
    song:{},
    yuan:{},
    ming:{},
    qing:{},
    mpName: " ",
    mPerson: {},
    isInput: false,
    isLoaded: false,
    isradio: 1,
    maxRelationValue: 6,
    relationValue: 5,
    isChanged: false
  }
}


handleSetState = (tempState)=>{
  let {mpName,mPerson,isInput,isLoaded,isradio,maxRelationValue,relationValue,isChanged}=tempState
  this.setState({
    mpName: mpName,
    mPerson: mPerson,
    isInput: isInput,
    isLoaded: isLoaded,
    isradio: isradio,
    maxRelationValue: maxRelationValue,
    relationValue: relationValue,
    isChanged: isChanged
  })
}


componentDidMount() {
  console.log('lalal')


  Promise.all([reqHeatMapTang(), reqHeatMapSong(), reqHeatMapYuan(), reqHeatMapMing(), reqHeatMapQing()])
  .then( ( result ) => {
    let mapName = ['tang', 'song', 'yuan', 'ming', 'qing']
    result.map( (item, index) => {
      console.log('map')
      this.setState({ [mapName[index]] : convertData(item)})
      
    } )
  })
  

}

  render() {
    return (
      <React.Fragment>
        <div style = {{float:'left', overflow:'hidden',width:'50% '}}>  
        <Line />
        {/* <Suspense fallback={'loading'} > */}
        <Map />
        {/* </Suspense> */}
        </div>
        <div style = {{float:'left',width:'50%'}}>  
        <FiveDynastiesAppointedSituations tempState={this.state} handleSetState={this.handleSetState} />
          <OfficersJobInformation mpName={this.state.mpName}/>
        </div>
        <div style={{clear:'both'}}> </div>
      </React.Fragment>
      
    )
  }
}
