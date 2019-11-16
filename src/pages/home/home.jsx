import React from 'react'
import './home.less'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../component/left-Nav/leftNav'
import Logo from '../logo/logo'
import Charts from '../test/charts'
import echarts from 'echarts/lib/echarts';
import {
  reqMapTang,
  reqMapSong,
  reqMapYuan,
  reqMapMing,
  reqMapQing,
} from '../../request/ajax'


const { Content, Footer } = Layout;

/**
 * @class 主页面+路由
 */
export default class Home extends React.Component {

  state = {
    collapsed: false,
  };


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    // let indexedDB =
    //   window.indexedDB ||
    //   window.webkitIndexedDB ||
    //   window.mozIndexedDB ||
    //   window.msIndexedDB;
    // if (indexedDB) {
    //   let db = indexedDB.open('map')
    // }

    // else {
    //   Promise.all([reqMapTang(), reqMapSong(), reqMapYuan(), reqMapMing(), reqMapQing()])
    //     .then((result) => {
    //       let mapName = ['tang', 'song', 'yuan', 'ming', 'qing']
    //       result.map((item, index) => {
    //         console.log(mapName[index], item)

    //         echarts.registerMap(mapName[index], item)  //注册地图
    //       })
    //     })
    // }
    Promise.all([reqMapTang(), reqMapSong(), reqMapYuan(), reqMapMing(), reqMapQing()])
      .then((result) => {
        let mapName = ['tang', 'song', 'yuan', 'ming', 'qing']
        result.map((item, index) => {
          console.log(mapName[index], item)

          echarts.registerMap(mapName[index], item)  //注册地图
        })
      })
  }



  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <LeftNav />
          <Layout>
            <Content style={{ backgroundColor: '#fff' }}>
              <Switch>
                <Route path='/home' component={Logo} />
                <Route path='/testCharts' component={Charts} />
              </Switch>
            </Content>
            <Footer >Created by Feng & Wang  @2019 </Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}
