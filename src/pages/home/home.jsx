import React from 'react'
import './home.less'
import { BrowserRouter as Router, Link,Route, Switch } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Header from '../../component/header/header'
import LeftNav from '../../component/left-Nav/leftNav'
import Bar from '../../component/charts/bar'
import Logo from '../logo/logo'


const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
          <LeftNav />
        <Layout>
          <Content style={{backgroundColor: '#fff'}}>
          <Header />
          <Switch>
            <Route path='/home' component={Logo}/> 

          </Switch>
          
          </Content>
          <Footer >Created by Feng & Wang  @2019 </Footer>
        </Layout>
      </Layout>
      </Router>
      
    
    )
  }

}
