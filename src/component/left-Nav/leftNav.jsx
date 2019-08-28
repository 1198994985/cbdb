
import React, { Component, useState, useEffect } from 'react'
import logo from './min_logo.png'
import { Layout, Menu, Icon } from 'antd';
import './index.less'
import {Link, withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'

const { Sider } = Layout;
const { SubMenu } = Menu;



function LeftNav(props) {
  let openKey; //决定左侧导航选中元素
  let path = props.location.pathname; // 获取当前页面地址
  const [collapsed,setCollapsed] = useState(false);
  const [list,serList] = useState([]);
  // const [onbutton,setOnButton] = useState(true);


  /*
  根据menu的数据数组生成对应的标签数组
  map() + 递归调用
  */
  const getMenuNodes = (menuList) => {
    console.log('getMenuNodes')

    // 一级菜单
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
          openKey = item.key
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

            {/* // 二级菜单 */}
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


  useEffect( ()=> {
    // 得到需要打开菜单项的key
    serList(getMenuNodes(menuList));
  },[] )

  const onCollapse = collpd => {
    setCollapsed(collpd);
    console.log('onCollapse')
    // if(collapsed === false) {
    //   setTimeout(() => (setOnButton(!onbutton)),150)
    //   console.log('展开')
    // } else {
    //    setOnButton(!onbutton))
    // }
  };
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
        <div className="left-nav">
            <Link to='/home/' className="left-nav-header">
              <img className="left-nav-logo" src={logo} alt="logo"/>
            </Link>
        </div>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  selectedKeys={[path]} defaultOpenKeys={[openKey]} >
          { list }
        </Menu>
    </Sider>
    )
  }


export default withRouter(LeftNav);