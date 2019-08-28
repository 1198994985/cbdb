
import React, { Component } from 'react'
import logo from './min_logo.png'
import { Layout, Menu, Icon } from 'antd';
import './index.less'
import {Link, withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'

const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      onbutton: true
    };
    this.menuNodes = this.getMenuNodes(menuList)    
  }

  /*
  根据menu的数据数组生成对应的标签数组
  map() + 递归调用
  */
  getMenuNodes = (menuList) => {
    //获取当前路径
    const path = this.props.location.pathname;
    console.log("风波最帅2")
    return menuList.map( (item) => {
      if(!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span> {item.title} </span>
            </Link>
          </Menu.Item>
        )
      } else {
        //菜单选中
        const cItem = item.children.find( cItem => cItem.key === path );
        if(cItem) {
          this.openKey = item.key
        }

        return (
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{"  " + item.title}</span>
            </span>
          }
        >
          {item.children.map( (item) => {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <Icon type={item.icon} />
                  <span> {item.title} </span>
                </Link>
              </Menu.Item>
            )
          } )}

        </SubMenu>
        )
      }
    } )
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
    // if(collapsed === false) {
    //   setTimeout(()=>(this.setState((preState) => {
    //     return { onbutton:!preState.onbutton}
    //   })),150)
    //   console.log('展开')
    // } else {
    //   this.setState((preState) => {
    //     return { onbutton:!preState.onbutton}
    //   })
    // }
  };

  render() {

    const path = this.props.location.pathname
    // 得到需要打开菜单项的key
    const openKey = this.openKey

    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
        <div className="left-nav">
            <Link to='/home/' className="left-nav-header">
              <img className="left-nav-logo" src={logo} alt="logo"/>
            </Link>
        </div>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  selectedKeys={[path]} defaultOpenKeys={[openKey]} >
          { this.menuNodes }
        </Menu>
    </Sider>
    )
  }
}

export default withRouter(LeftNav);