import React, { Component } from 'react'
import './PeopleRelationship.css'
import axios from 'axios'
import $ from "jquery"

import { Row, Col, Card, Radio, Button, Slider, Input, Icon, Tooltip, Table } from 'antd'
import D3SimpleForceChart from '../D3SimpleChart/D3SimpleChart'

const RadioGroup = Radio.Group

export default class PeopleRelationship extends Component {
  state = {
    mpName: " ",
    isInput: false,
    isLoaded: false,
    isChanged: false,
    mPerson: {},
    basicInfo: {},
    postPersons: [],
    isRadio: 1,
    maxRelationValue: 0,
    relationValue: [0, 0],
    marks: { 0: "" }
  }
  // 搜索人物
  handleClick = () => {
    this.setState({
      mPerson: {},
      isLoaded: false,
      isInput: true,
      maxRelationValue: 0,
      marks: { 0: "" }
    },
      () => {
        //回调函数，是在设置状态成功之后执行的,这里打印的是最新的state值
        console.log(this.state.mpName)
        if (this.state.isInput) {
          const { mpName, marks } = this.state
          const url = "/person?mpName=" + mpName + "&dataType=1"
          let count = 0
          axios.get(url)
            .then(response => {
              const result = response.data
              for (let i = 0; i < result.assocPersons.length; i++) {
                const assocType = parseInt(result.assocPersons[i].assocType, 10)
                if (marks.hasOwnProperty(assocType)) {
                  continue
                } else {
                  marks[assocType] = ''
                }
                if (count < assocType) {
                  count = assocType
                }
              }
              this.setState({
                mPerson: result,
                isLoaded: true,
                relationValue: [0, count / 2],
                maxRelationValue: count + 20,
                marks: marks
              })
            })
            .catch(error => {
              // debugger
              console.log(error)
              alert('对不起！找不到数据！' + error)
              this.setState({
                isInput: false
              })
            })
          this.getPost(mpName)
          this.getBasic(mpName)
        }
      })
    // alert("您搜索的人物是:" + this.msgInput.value)
  }

  //回车进行搜索
  handleKeyPress = (event) => {
    if ((event.keyCode || event.which) === 13) {
      this.setState({
        mPerson: {},
        isLoaded: false,
        isInput: true,
        maxRelationValue: 0,
        marks: { 0: "" }
      },
        () => {
          //这里打印的是最新的state值
          console.log(this.state.mpName)
          if (this.state.isInput) {
            const { mpName, marks } = this.state
            const url = "/person?mpName=" + mpName + "&dataType=1"
            let count = 0
            axios.get(url)
              .then(response => {
                const result = response.data
                for (let i = 0; i < result.assocPersons.length; i++) {
                  const assocType = parseInt(result.assocPersons[i].assocType, 10)
                  if (marks.hasOwnProperty(assocType)) {
                    continue
                  } else {
                    marks[assocType] = ''
                  }
                  if (count < assocType) {
                    count = assocType
                  }
                }
                this.setState({
                  mPerson: result,
                  isLoaded: true,
                  relationValue: [0, count / 2],
                  maxRelationValue: count + 20,
                  marks: marks
                })
              })
              .catch(error => {
                // debugger
                console.log(error)
                alert('对不起！找不到数据！')
                this.setState({
                  isInput: false
                })
              })
            this.getPost(mpName)
            this.getBasic(mpName)
          }
        })
      // alert("您搜索的人物是:" + this.msgInput.value)
    }
  }

  //任职信息
  getPost = (mpName) => {
    const address = "/person?mpName=" + mpName + "&dataType=3"
    /**********************************************任职信息***********************************************************/
    setTimeout(() => {
      axios.get(address)
        .then(response => {
          const result = response.data
          this.setState({
            postPersons: result.postPersons
          })
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)

  }

  //生平信息
  getBasic = (mpName) => {
    const address = "/person?mpName=" + mpName + "&dataType=4"
    /**********************************************生平信息***********************************************************/
    setTimeout(() => {
      axios.get(address)
        .then(response => {
          const result = response.data
          this.setState({
            basicInfo: result.basicInfo
          })
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)
  }

  // 获取人物关系
  getRelation = (e) => {
    this.setState({ isRadio: e.target.value })
    if (this.state.mpName !== " ") {
      this.setState({
        mPerson: {},
        isLoaded: false,
        isInput: true,
        maxRelationValue: 0,
        marks: { 0: "" }
      },
        () => {
          if (this.state.isInput) {
            if (this.state.isRadio === 1) {
              /**********************************************社交关系***********************************************************/
              const { mpName, marks } = this.state
              const url = "/person?mpName=" + mpName + "&dataType=1"
              let count = 0
              axios.get(url)
                .then(response => {
                  const result = response.data
                  for (let i = 0; i < result.assocPersons.length; i++) {
                    const assocType = parseInt(result.assocPersons[i].assocType, 10)
                    if (marks.hasOwnProperty(assocType)) {
                      continue
                    } else {
                      marks[assocType] = ''
                    }
                    if (count < assocType) {
                      count = assocType
                    }
                  }
                  this.setState({
                    mPerson: result,
                    isLoaded: true,
                    relationValue: [0, count / 2],
                    maxRelationValue: count + 20,
                    marks: marks
                  })
                })
                .catch(error => {
                  // debugger
                  console.log(error)
                  alert('对不起！1找不到数据！' + error)
                  this.setState({
                    isInput: false
                  })
                })
              this.getPost(mpName)
              this.getBasic(mpName)

            } else if (this.state.isRadio === 2) {
              /**********************************************亲属关系***********************************************************/
              const { mpName, marks } = this.state
              const url = "/person?mpName=" + mpName + "&dataType=2"
              let count = 0
              axios.get(url)
                .then(response => {
                  const result = response.data
                  for (let i = 0; i < result.kinPersons.length; i++) {
                    if (marks.hasOwnProperty(parseInt(result.kinPersons[i].kinType, 10))) {
                      continue
                    } else {
                      marks[parseInt(result.kinPersons[i].kinType, 10)] = ''
                    }
                    if (count < parseInt(result.kinPersons[i].kinType, 10)) {
                      count = parseInt(result.kinPersons[i].kinType, 10)
                    }
                  }
                  this.setState({
                    mPerson: result,
                    isLoaded: true,
                    relationValue: [0, count / 2],
                    maxRelationValue: count + 20,
                    marks: marks
                  })
                })
                .catch(error => {
                  // debugger
                  console.log(error)
                  alert('对不起！2找不到数据！' + error)
                  this.setState({
                    isInput: false
                  })
                })
              this.getPost(mpName)
              this.getBasic(mpName)

            } else if (this.state.isRadio === 3) {
              /**********************************************所有关系***********************************************************/
              let result = {}
              const { mpName, marks } = this.state
              const url_1 = "/person?mpName=" + this.state.mpName + "&dataType=1"
              const url_2 = "/person?mpName=" + this.state.mpName + "&dataType=2"
              let count = 0
              axios.get(url_1)
                .then(response => {
                  result = response.data
                  for (let i = 0; i < result.assocPersons.length; i++) {
                    const assocType = parseInt(result.assocPersons[i].assocType, 10)
                    if (marks.hasOwnProperty(assocType)) {
                      continue
                    } else {
                      marks[assocType] = ''
                    }
                    if (count < assocType) {
                      count = assocType
                    }
                  }
                })
                .catch(error => {
                  console.log(error)
                  alert('对不起！3.1找不到数据！' + error)
                  this.setState({
                    isInput: false
                  })
                })
              setTimeout(() => {
                axios.get(url_2)
                  .then(response => {
                    const result_2 = response.data
                    for (let i = 0; i < result_2.kinPersons.length; i++) {
                      if (marks.hasOwnProperty(parseInt(result_2.kinPersons[i].kinType, 10))) {
                        continue
                      } else {
                        marks[parseInt(result_2.kinPersons[i].kinType, 10)] = ''
                      }
                      if (count < parseInt(result_2.kinPersons[i].kinType, 10)) {
                        count = parseInt(result_2.kinPersons[i].kinType, 10)
                      }
                    }
                    $.extend(true, result, result_2)
                    this.setState({
                      mPerson: result,
                      isLoaded: true,
                      relationValue: [0, count / 2],
                      maxRelationValue: count + 20,
                      marks: marks
                    })
                  })
                  .catch(error => {
                    console.log(error)
                    alert('对不起！3.2找不到数据！' + error)
                    this.setState({
                      isInput: false
                    })
                  })

              }, 1000)
              this.getPost(mpName)
              this.getBasic(mpName)
            } else {
              console.log(this.state.isRadio)
              alert("请求失败")
            }

          }

        })
    }
  }

  //删除重复项
  removeRepeat = (arr) => {
    let cache = {}
    let key, result = []
    for (let i = 0; i < arr.length; i++) {
      key = arr[i][0]
      if (!cache[key]) {
        cache[key] = 1
        result.push(arr[i])
      }
    }
    return result
  }


  handleChange = (value) => {
    this.setState({
      relationValue: value,
    })
  }

  handleInputChange = (event) => {
    this.setState({
      mpName: event.target.value
    })
  }

  //搜索对象拓展关系
  nameHandler(name) {
    this.setState({ mpName: name })

    if (this.state.mpName) {
      this.setState({
        isLoaded: false,
        isInput: true,
        maxRelationValue: 0,
        marks: { 0: "" }
      },
        () => {
          //这里打印的是最新的state值
          console.log(this.state.mpName)
          if (this.state.isInput) {
            if (this.state.isRadio === 1) {
              const { mpName, marks, mPerson } = this.state
              const url = "/person?mpName=" + mpName + "&dataType=1"
              let count = 0
              axios.get(url)
                .then(response => {
                  const result = response.data
                  // $.extend(true, mPerson.assocPersons, result.assocPersons)
                  let length_1 = mPerson.assocPersons.length
                  let length_2 = result.assocPersons.length
                  for (let i = 0; i < length_1; i++) {
                    for (let j = 0; j < length_2; j++) {
                      if (mPerson.assocPersons.length > 0) {
                        if (mPerson.assocPersons[i].assocTarget === result.assocPersons[j].assocTarget) {
                          mPerson.assocPersons.splice(i, 1)
                          length_1--
                          console.log(result.assocPersons[j])
                        }
                      }
                    }
                  }

                  for (let i = 0; i < length_2; i++) {
                    mPerson.assocPersons.push(result.assocPersons[i])
                  }

                  for (let i = 0; i < mPerson.assocPersons.length; i++) {
                    const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                    if (marks.hasOwnProperty(assocType)) {
                      continue
                    } else {
                      marks[assocType] = ''
                    }
                    if (count < assocType) {
                      count = assocType
                    }
                  }
                  this.setState({
                    mPerson: mPerson,
                    isLoaded: true,
                    relationValue: [0, count / 2],
                    maxRelationValue: count + 20,
                    marks: marks
                  })
                })
                .catch(error => {
                  // debugger
                  console.log(error)
                  alert('对不起！找不到数据！')
                  this.setState({
                    isInput: false
                  })
                })

              this.getPost(mpName)
              this.getBasic(mpName)

            } else if (this.state.isRadio === 2) {
              const url = "/person?mpName=" + this.state.mpName + "&dataType=2"
              axios.get(url)
                .then(response => {
                  const result = response.data
                  this.setState({
                    mPerson: result,
                    isLoaded: true,

                  })
                })
                .catch(error => {
                  console.log(error)
                  alert('对不起！找不到数据！' + error)
                  this.setState({
                    isInput: false
                  })
                })
            } else {

              alert("请求失败")
            }

          }

        })
    }

  }

  render() {
    if (!this.state.isInput) {
      //初始化界面
      return (
        <div className="bar1">
          <Row>
            <Col span={6} offset={8}>
              <Input
                placeholder="请输入实体名称"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                  <Tooltip title="请输入繁体字">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }

                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.handleClick}>搜索</Button>
            </Col>
          </Row>
        </div>
      )
    } else {
      if (!this.state.isLoaded) {
        return <div><h1>Loading...</h1></div>
      } else {//导入数据，以显示关系图
        let data, dataTree

        let types = []
        let target = []
        let number = 0
        let nodeIndex = {}

        const columns = [
          {
            title: '上任时间',
            dataIndex: 'firstYear'
          },
          {
            title: '官职名称',
            dataIndex: 'officeName'
          },
          {
            title: '任职地址',
            dataIndex: 'addressName'
          }
        ]

        const { basicInfo, postPersons, mPerson, mpName, relationValue } = this.state

        // 设置社会关系数据
        if (this.state.isRadio === 1) {
          data = {
            nodes: [],
            edges: []
          }

          data.nodes.push({
            index: 0,
            id: parseInt(mPerson.personInfo.personId, 10),
            name: mPerson.personInfo.chName,
            group: 0,
            color: 0,
            type: 0
          })
          nodeIndex[mPerson.personInfo.personId] = 0

          //生成一个target数组
          for (let i = 0; i < mPerson.assocPersons.length; i++) {
            const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
            const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)

            if (assocType > relationValue[0] && assocType <= relationValue[1]) {
              if (target.indexOf(assocTarget) > -1) {

              } else {
                target.push(assocTarget)
              }
            }
          }

          //根据target来分配
          for (let t = 0; t < target.length; t++) {
            if (target[t] === mPerson.personInfo.personId) {

              let type = [0]
              let typeNumber = [1]
              let codeTypes = {}

              //子关系[]并计算数量[],子关系及其详细关系{num:[]}
              for (let i = 0; i < mPerson.assocPersons.length; i++) {
                const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                const assocCode = parseInt(mPerson.assocPersons[i].assocCode, 10)
                const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)
                const assocName = mPerson.assocPersons[i].assocName

                if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === mPerson.personInfo.personId) {
                  if (type.indexOf(assocType) > -1) {
                    let j = type.indexOf(assocType)
                    typeNumber[j]++
                  } else {
                    type.push(assocType)
                    typeNumber.push(1)
                  }

                  if (codeTypes.hasOwnProperty(assocType)) {
                    codeTypes[assocType].push([assocCode, assocName])
                  } else {
                    codeTypes[assocType] = [[assocCode, assocName]]
                  }
                }

              }

              //详细关系去重
              for (let i = 1; i < type.length; i++) {
                let codes = codeTypes[type[i]]
                codeTypes[type[i]] = this.removeRepeat(codes)
              }

              //子关系及其数量[[type,num]],用于饼状图
              for (let i = 0; i < type.length; i++) {
                switch (type[i]) {
                  case 0:
                    types.push(['自己', typeNumber[i], type[i]])
                    break
                  case 110:
                    types.push(['社会关系（笼统）', typeNumber[i], type[i]])
                    break
                  case 120:
                    types.push(['同为成员', typeNumber[i], type[i]])
                    break
                  case 130:
                    types.push(['社会交际', typeNumber[i], type[i]])
                    break
                  case 220:
                    types.push(['师生关系', typeNumber[i], type[i]])
                    break
                  case 230:
                    types.push(['学术交往', typeNumber[i], type[i]])
                    break
                  case 240:
                    types.push(['学术主题相近', typeNumber[i], type[i]])
                    break
                  case 250:
                    types.push(['同为成员', typeNumber[i], type[i]])
                    break
                  case 260:
                    types.push(['学术襄助', typeNumber[i], type[i]])
                    break
                  case 270:
                    types.push(['文学艺术交往', typeNumber[i], type[i]])
                    break
                  case 280:
                    types.push(['学术攻讦', typeNumber[i], type[i]])
                    break
                  case 310:
                    types.push(['朋友关系（笼统）', typeNumber[i], type[i]])
                    break
                  case 410:
                    types.push(['政治关系（笼统）', typeNumber[i], type[i]])
                    break
                  case 420:
                    types.push(['官场关系（平级）', typeNumber[i], type[i]])
                    break
                  case 430:
                    types.push(['官场关系（下属）', typeNumber[i], type[i]])
                    break
                  case 440:
                    types.push(['官场关系（上司）', typeNumber[i], type[i]])
                    break
                  case 450:
                    types.push(['政治奥援', typeNumber[i], type[i]])
                    break
                  case 460:
                    types.push(['荐举保任', typeNumber[i], type[i]])
                    break
                  case 470:
                    types.push(['政治对抗', typeNumber[i], type[i]])
                    break
                  default:
                    break
                }
              }

              //关系类节点加载
              for (let i = 1; i < type.length; i++) {
                number++
                data.nodes.push({
                  index: number,
                  id: type[i],
                  name: types[i][0],
                  group: type[i],
                  color: type[i] * 2,
                  type: 0
                })
                nodeIndex[target[t] + types[i][0].toString()] = number
              }

              //关系类边加载
              for (let i = 1; i < type.length; i++) {
                data.edges.push({
                  source: nodeIndex[target[t] + types[i][0].toString()],
                  target: nodeIndex[mPerson.personInfo.personId]
                })
              }

              //子关系节点加载
              for (let i = 1; i < type.length; i++) {
                let codes = codeTypes[type[i]]
                for (let j = 0; j < codes.length; j++) {
                  number++
                  data.nodes.push({
                    index: number,
                    id: codes[j][0],
                    name: codes[j][1],
                    group: type[i],
                    color: codes[j][0],
                    type: 0
                  })
                  nodeIndex[target[t] + codes[j][1].toString()] = number
                }
              }
              //子关系边加载
              for (let i = 1; i < type.length; i++) {
                let codes = codeTypes[type[i]]
                for (let j = 0; j < codes.length; j++) {
                  data.edges.push({
                    source: nodeIndex[target[t] + codes[j][1].toString()],
                    target: nodeIndex[target[t] + types[i][0].toString()]
                  })
                }
              }
              //人物节点加载
              for (let i = 0; i < mPerson.assocPersons.length; i++) {
                const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)

                if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === mPerson.personInfo.personId) {
                  number++
                  data.nodes.push({
                    index: number,
                    id: parseInt(mPerson.assocPersons[i].assocPersonId, 10),
                    name: mPerson.assocPersons[i].assocPersonName,
                    group: assocType,
                    color: assocType,
                    type: 1
                  })
                  nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()] = number
                }
              }

              //人物边加载
              for (let i = 0; i < mPerson.assocPersons.length; i++) {
                const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                const assocName = mPerson.assocPersons[i].assocName
                const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)

                if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === mPerson.personInfo.personId) {
                  data.edges.push({
                    source: nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()],
                    target: nodeIndex[target[t] + assocName.toString()]
                  })
                }
              }
            } else {
              let targetIndes = []
              for (let i = 0; i < mPerson.assocPersons.length; i++) {
                if (mPerson.assocPersons[i].assocPersonId === target[t]) {
                  targetIndes.push(mPerson.assocPersons[i].assocPersonId + mPerson.assocPersons[i].assocType.toString())
                }
              }

              for (let ti = 0; ti < targetIndes.length; ti++) {
                let type = []
                let typeNumber = []
                let typeList = []
                let codeTypes = {}

                //子关系[]并计算数量[],子关系及其详细关系{num:[]}
                for (let i = 0; i < mPerson.assocPersons.length; i++) {
                  const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                  const assocCode = parseInt(mPerson.assocPersons[i].assocCode, 10)
                  const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)
                  const assocName = mPerson.assocPersons[i].assocName

                  if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === target[t]) {
                    if (type.indexOf(assocType) > -1) {
                      let j = type.indexOf(assocType)
                      typeNumber[j]++
                    } else {
                      type.push(assocType)
                      typeNumber.push(1)
                    }

                    if (codeTypes.hasOwnProperty(assocType)) {
                      codeTypes[assocType].push([assocCode, assocName])
                    } else {
                      codeTypes[assocType] = [[assocCode, assocName]]
                    }
                  }

                }

                //详细关系去重
                for (let i = 0; i < type.length; i++) {
                  let codes = codeTypes[type[i]]
                  codeTypes[type[i]] = this.removeRepeat(codes)
                }

                //子关系及其数量[[type,num]],用于饼状图
                for (let i = 0; i < type.length; i++) {
                  switch (type[i]) {
                    case 0:
                      typeList.push(['自己', typeNumber[i], type[i]])
                      break
                    case 110:
                      typeList.push(['社会关系（笼统）', typeNumber[i], type[i]])
                      break
                    case 120:
                      typeList.push(['同为成员', typeNumber[i], type[i]])
                      break
                    case 130:
                      typeList.push(['社会交际', typeNumber[i], type[i]])
                      break
                    case 220:
                      typeList.push(['师生关系', typeNumber[i], type[i]])
                      break
                    case 230:
                      typeList.push(['学术交往', typeNumber[i], type[i]])
                      break
                    case 240:
                      typeList.push(['学术主题相近', typeNumber[i], type[i]])
                      break
                    case 250:
                      typeList.push(['同为成员', typeNumber[i], type[i]])
                      break
                    case 260:
                      typeList.push(['学术襄助', typeNumber[i], type[i]])
                      break
                    case 270:
                      typeList.push(['文学艺术交往', typeNumber[i], type[i]])
                      break
                    case 280:
                      typeList.push(['学术攻讦', typeNumber[i], type[i]])
                      break
                    case 310:
                      typeList.push(['朋友关系（笼统）', typeNumber[i], type[i]])
                      break
                    case 410:
                      typeList.push(['政治关系（笼统）', typeNumber[i], type[i]])
                      break
                    case 420:
                      typeList.push(['官场关系（平级）', typeNumber[i], type[i]])
                      break
                    case 430:
                      typeList.push(['官场关系（下属）', typeNumber[i], type[i]])
                      break
                    case 440:
                      typeList.push(['官场关系（上司）', typeNumber[i], type[i]])
                      break
                    case 450:
                      typeList.push(['政治奥援', typeNumber[i], type[i]])
                      break
                    case 460:
                      typeList.push(['荐举保任', typeNumber[i], type[i]])
                      break
                    case 470:
                      typeList.push(['政治对抗', typeNumber[i], type[i]])
                      break
                    default:
                      break
                  }
                }

                for (let i = 0; i < types.length; i++) {

                  for (let j = 0; j < typeList.length; j++) {
                    if (types[i][0] === typeList[j][0]) {
                      types[i][1] = types[i][1] + typeList[j][1]
                    }
                  }
                }

                //关系类节点加载
                for (let i = 0; i < type.length; i++) {
                  number++
                  data.nodes.push({
                    index: number,
                    id: type[i],
                    name: typeList[i][0],
                    group: type[i],
                    color: type[i],
                    type: 0
                  })
                  nodeIndex[target[t] + typeList[i][0].toString()] = number
                }

                //关系类边加载
                for (let i = 0; i < type.length; i++) {
                  data.edges.push({
                    source: nodeIndex[target[t] + typeList[i][0].toString()],
                    target: nodeIndex[targetIndes[ti]]
                  })
                }

                //子关系节点加载
                for (let i = 0; i < type.length; i++) {
                  let codes = codeTypes[type[i]]
                  for (let j = 0; j < codes.length; j++) {
                    number++
                    data.nodes.push({
                      index: number,
                      id: codes[j][0],
                      name: codes[j][1],
                      group: type[i],
                      color: codes[j][0],
                      type: 0
                    })
                    nodeIndex[target[t] + codes[j][1].toString()] = number
                  }
                }
                //子关系边加载
                for (let i = 0; i < type.length; i++) {
                  let codes = codeTypes[type[i]]
                  for (let j = 0; j < codes.length; j++) {
                    data.edges.push({
                      source: nodeIndex[target[t] + codes[j][1].toString()],
                      target: nodeIndex[target[t] + typeList[i][0].toString()]
                    })
                  }
                }
                //人物节点加载
                for (let i = 0; i < mPerson.assocPersons.length; i++) {
                  const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                  const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)

                  if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === target[t]) {
                    number++
                    data.nodes.push({
                      index: number,
                      id: parseInt(mPerson.assocPersons[i].assocPersonId, 10),
                      name: mPerson.assocPersons[i].assocPersonName,
                      group: assocType,
                      color: assocType,
                      type: 1
                    })
                    nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()] = number
                  }
                }

                //人物边加载
                for (let i = 0; i < mPerson.assocPersons.length; i++) {
                  const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
                  // const assocCode = mPerson.assocPersons[i].assocCode
                  const assocName = mPerson.assocPersons[i].assocName
                  const assocTarget = parseInt(mPerson.assocPersons[i].assocTarget, 10)

                  if (assocType > relationValue[0] && assocType <= relationValue[1] && assocTarget === target[t]) {
                    data.edges.push({
                      source: nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()],
                      target: nodeIndex[target[t] + assocName]
                    })
                  }
                }
              }
            }

          }

          dataTree = {}
          let edgesBak = data.edges.concat()
          let nodesBak = data.nodes.concat()

          //将数据整理为树状结构
          nodesBak.forEach(function (d) {
            if (d.index === 0) {
              let temp = {
                name: d.name,
                id: d.id,
                color: d.color,
                group: d.group,
                type: d.type,
                children: []
              }

              let pos = {}
              let tree = []
              edgesBak.forEach(function (edge) {
                if (edge.target === d.index) {
                  tree.push({
                    name: data.nodes[edge.source].name,
                    id: data.nodes[edge.source].id,
                    color: data.nodes[edge.source].color,
                    group: data.nodes[edge.source].group,
                    type: data.nodes[edge.source].type,
                    children: []
                  })
                  pos[edge.source] = [tree.length - 1]
                } else {
                  let posArr = pos[edge.target]
                  if (posArr !== undefined) {
                    let obj = tree[posArr[0]]
                    for (let j = 1; j < posArr.length; j++) {
                      obj = obj.children[posArr[j]]
                    }
                    obj.children.push({
                      name: data.nodes[edge.source].name,
                      id: data.nodes[edge.source].id,
                      color: data.nodes[edge.source].color,
                      group: data.nodes[edge.source].group,
                      type: data.nodes[edge.source].type,
                      children: []
                    })
                    pos[edge.source] = posArr.concat([obj.children.length - 1])
                  }
                }
              })
              temp.children = tree
              dataTree = temp
            }
          })
          // console.log(data)
        }
        // 设置亲属关系数据
        else if (this.state.isRadio === 2) {
          let type = [0]
          let typeNumber = [1]
          let codeTypes = {}

          data = {
            nodes: [],
            edges: []
          }

          data.nodes.push({
            index: 0,
            id: parseInt(mPerson.personInfo.personId, 10),
            name: mPerson.personInfo.chName,
            group: 0,
            color: 0,
            type: 0
          })
          nodeIndex[mPerson.personInfo.personId] = 0

          //子关系[]并计算数量[],子关系及其详细关系{num:[]}
          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)
            const kinCode = parseInt(mPerson.kinPersons[i].kinCode, 10)
            const kinRelName = mPerson.kinPersons[i].kinRelName

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              if (type.indexOf(kinType) > -1) {
                let j = type.indexOf(kinType)
                typeNumber[j]++
              } else {
                type.push(kinType)
                typeNumber.push(1)
              }

              if (codeTypes.hasOwnProperty(kinType)) {
                codeTypes[kinType].push([kinCode, kinRelName])
              } else {
                codeTypes[kinType] = [[kinCode, kinRelName]]
              }
            }
          }

          //详细关系去重
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            codeTypes[type[i]] = this.removeRepeat(codes)
          }

          //子关系及其数量[[type,num]],用于饼状图
          for (let i = 0; i < type.length; i++) {
            switch (type[i]) {
              case 0:
                types.push(['自己', typeNumber[i], type[i]])
                break
              case 10:
                types.push(['本宗血亲', typeNumber[i], type[i]])
                break
              case 30:
                types.push(['本宗姻亲', typeNumber[i], type[i]])
                break
              case 50:
                types.push(['妻服', typeNumber[i], type[i]])
                break
              case 70:
                types.push(['夫服', typeNumber[i], type[i]])
                break
              case 90:
                types.push(['外服', typeNumber[i], type[i]])
                break
              default:
                break
            }
          }

          //关系类节点加载
          for (let i = 1; i < type.length; i++) {
            number++
            data.nodes.push({
              index: number,
              id: type[i],
              name: types[i][0],
              group: type[i],
              color: type[i],
              type: 0
            })
            nodeIndex[type[i].toString()] = number
          }

          //关系类边加载
          for (let i = 1; i < type.length; i++) {
            data.edges.push({
              source: nodeIndex[type[i].toString()],
              target: nodeIndex[mPerson.personInfo.personId]
            })
          }

          //子关系节点加载
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            for (let j = 0; j < codes.length; j++) {
              number++
              data.nodes.push({
                index: number,
                id: codes[j][0],
                name: codes[j][1],
                group: type[i],
                color: codes[j][0],
                type: 0
              })
              nodeIndex[codes[j][0].toString()] = number
            }
          }
          //子关系边加载
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            for (let j = 0; j < codes.length; j++) {
              data.edges.push({
                source: nodeIndex[codes[j][0].toString()],
                target: nodeIndex[type[i].toString()]
              })
            }
          }
          //人物节点加载
          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              number++
              data.nodes.push({
                index: number,
                id: parseInt(mPerson.kinPersons[i].kinPersonId, 10),
                name: mPerson.kinPersons[i].kinPersonName,
                group: kinType,
                color: kinType,
                type: 2
              })
              nodeIndex[mPerson.kinPersons[i].kinPersonId + kinType.toString()] = number
            }
          }

          //人物边加载
          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)
            const kinCode = mPerson.kinPersons[i].kinCode

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              data.edges.push({
                source: nodeIndex[mPerson.kinPersons[i].kinPersonId + kinType.toString()],
                target: nodeIndex[kinCode]
              })
            }
          }

          dataTree = {}
          let edgesBak = data.edges.concat()
          let nodesBak = data.nodes.concat()

          //将数据整理为树状结构
          nodesBak.forEach(function (d) {
            if (d.index === 0) {
              let temp = {
                name: d.name,
                id: d.id,
                color: d.color,
                group: d.group,
                type: d.type,
                children: []
              }

              let pos = {}
              let tree = []
              edgesBak.forEach(function (edge) {
                if (edge.target === d.index) {
                  tree.push({
                    name: data.nodes[edge.source].name,
                    id: data.nodes[edge.source].id,
                    color: data.nodes[edge.source].color,
                    group: data.nodes[edge.source].group,
                    type: data.nodes[edge.source].type,
                    children: []
                  })
                  pos[edge.source] = [tree.length - 1]
                } else {
                  let posArr = pos[edge.target]
                  if (posArr !== undefined) {
                    let obj = tree[posArr[0]]
                    for (let j = 1; j < posArr.length; j++) {
                      obj = obj.children[posArr[j]]
                    }
                    obj.children.push({
                      name: data.nodes[edge.source].name,
                      id: data.nodes[edge.source].id,
                      color: data.nodes[edge.source].color,
                      group: data.nodes[edge.source].group,
                      type: data.nodes[edge.source].type,
                      children: []
                    })
                    pos[edge.source] = posArr.concat([obj.children.length - 1])
                  }
                }
              })
              temp.children = tree
              dataTree = temp
            }
          })
        }
        // 设置所有关系数据
        else if (this.state.isRadio === 3) {
          let type = [0]
          let typeNumber = [1]
          let codeTypes = {}

          data = {
            nodes: [],
            edges: []
          }

          data.nodes.push({
            index: 0,
            id: parseInt(mPerson.personInfo.personId, 10),
            name: mPerson.personInfo.chName,
            group: 0,
            color: 0,
            type: 0
          })
          nodeIndex[mPerson.personInfo.personId] = 0

          //子关系[]并计算数量[],子关系及其详细关系{num:[]}
          for (let i = 0; i < mPerson.assocPersons.length; i++) {
            const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
            const assocCode = parseInt(mPerson.assocPersons[i].assocCode, 10)
            const assocName = mPerson.assocPersons[i].assocName

            if (assocType > relationValue[0] && assocType <= relationValue[1]) {
              if (type.indexOf(assocType) > -1) {
                let j = type.indexOf(assocType)
                typeNumber[j]++
              } else {
                type.push(assocType)
                typeNumber.push(1)
              }

              if (codeTypes.hasOwnProperty(assocType)) {
                codeTypes[assocType].push([assocCode, assocName])
              } else {
                codeTypes[assocType] = [[assocCode, assocName]]
              }
            }
          }

          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)
            const kinCode = parseInt(mPerson.kinPersons[i].kinCode, 10)
            const kinRelName = mPerson.kinPersons[i].kinRelName

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              if (type.indexOf(kinType) > -1) {
                let j = type.indexOf(kinType)
                typeNumber[j]++
              } else {
                type.push(kinType)
                typeNumber.push(1)
              }

              if (codeTypes.hasOwnProperty(kinType)) {
                codeTypes[kinType].push([kinCode, kinRelName])
              } else {
                codeTypes[kinType] = [[kinCode, kinRelName]]
              }
            }
          }

          //详细关系去重
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            codeTypes[type[i]] = this.removeRepeat(codes)
          }


          //子关系及其数量[[type,num]],用于饼状图
          for (let i = 0; i < type.length; i++) {
            switch (type[i]) {
              case 0:
                types.push(['自己', typeNumber[i], type[i]])
                break
              case 10:
                types.push(['本宗血亲', typeNumber[i], type[i]])
                break
              case 30:
                types.push(['本宗姻亲', typeNumber[i], type[i]])
                break
              case 50:
                types.push(['妻服', typeNumber[i], type[i]])
                break
              case 70:
                types.push(['夫服', typeNumber[i], type[i]])
                break
              case 90:
                types.push(['外服', typeNumber[i], type[i]])
                break
              case 110:
                types.push(['社会关系（笼统）', typeNumber[i], type[i]])
                break
              case 120:
                types.push(['同为成员', typeNumber[i], type[i]])
                break
              case 130:
                types.push(['社会交际', typeNumber[i], type[i]])
                break
              case 220:
                types.push(['师生关系', typeNumber[i], type[i]])
                break
              case 230:
                types.push(['学术交往', typeNumber[i], type[i]])
                break
              case 240:
                types.push(['学术主题相近', typeNumber[i], type[i]])
                break
              case 250:
                types.push(['同为成员', typeNumber[i], type[i]])
                break
              case 260:
                types.push(['学术襄助', typeNumber[i], type[i]])
                break
              case 270:
                types.push(['文学艺术交往', typeNumber[i], type[i]])
                break
              case 280:
                types.push(['学术攻讦', typeNumber[i], type[i]])
                break
              case 310:
                types.push(['朋友关系（笼统）', typeNumber[i], type[i]])
                break
              case 410:
                types.push(['政治关系（笼统）', typeNumber[i], type[i]])
                break
              case 420:
                types.push(['官场关系（平级）', typeNumber[i], type[i]])
                break
              case 430:
                types.push(['官场关系（下属）', typeNumber[i], type[i]])
                break
              case 440:
                types.push(['官场关系（上司）', typeNumber[i], type[i]])
                break
              case 450:
                types.push(['政治奥援', typeNumber[i], type[i]])
                break
              case 460:
                types.push(['荐举保任', typeNumber[i], type[i]])
                break
              case 470:
                types.push(['政治对抗', typeNumber[i], type[i]])
                break
              default:
                break
            }
          }

          //关系类节点加载
          for (let i = 1; i < type.length; i++) {
            number++
            data.nodes.push({
              index: number,
              id: type[i],
              name: types[i][0],
              group: type[i],
              color: type[i],
              type: 0
            })
            nodeIndex[types[i][0]] = number
          }

          //关系类边加载
          for (let i = 1; i < type.length; i++) {
            data.edges.push({
              source: nodeIndex[types[i][0]],
              target: nodeIndex[mPerson.personInfo.personId]
            })
          }

          //子关系节点加载
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            for (let j = 0; j < codes.length; j++) {
              number++
              data.nodes.push({
                index: number,
                id: codes[j][0],
                name: codes[j][1],
                group: type[i],
                color: codes[j][0],
                type: 0
              })
              nodeIndex[codes[j][1]] = number
            }
          }

          //子关系边加载
          for (let i = 1; i < type.length; i++) {
            let codes = codeTypes[type[i]]
            for (let j = 0; j < codes.length; j++) {
              data.edges.push({
                source: nodeIndex[codes[j][1]],
                target: nodeIndex[types[i][0]]
              })
            }
          }

          //人物节点加载
          for (let i = 0; i < mPerson.assocPersons.length; i++) {
            const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)

            if (assocType > relationValue[0] && assocType <= relationValue[1]) {
              number++
              data.nodes.push({
                index: number,
                id: parseInt(mPerson.assocPersons[i].assocPersonId, 10),
                name: mPerson.assocPersons[i].assocPersonName,
                group: assocType,
                color: assocType,
                type: 1
              })
              nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()] = number
            }
          }

          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              number++
              data.nodes.push({
                index: number,
                id: parseInt(mPerson.kinPersons[i].kinPersonId, 10),
                name: mPerson.kinPersons[i].kinPersonName,
                group: kinType,
                color: kinType,
                type: 2
              })
              nodeIndex[mPerson.kinPersons[i].kinPersonId + kinType.toString()] = number
            }
          }

          //人物边加载
          for (let i = 0; i < mPerson.assocPersons.length; i++) {
            const assocType = parseInt(mPerson.assocPersons[i].assocType, 10)
            const assocName = mPerson.assocPersons[i].assocName

            if (assocType > relationValue[0] && assocType <= relationValue[1]) {
              data.edges.push({
                source: nodeIndex[mPerson.assocPersons[i].assocPersonId + assocType.toString()],
                target: nodeIndex[assocName]
              })
            }
          }

          for (let i = 0; i < mPerson.kinPersons.length; i++) {
            const kinType = parseInt(mPerson.kinPersons[i].kinType, 10)
            const kinRelName = mPerson.kinPersons[i].kinRelName

            if (kinType > relationValue[0] && kinType <= relationValue[1]) {
              data.edges.push({
                source: nodeIndex[mPerson.kinPersons[i].kinPersonId + kinType.toString()],
                target: nodeIndex[kinRelName]
              })
            }
          }

          dataTree = {}
          let edgesBak = data.edges.concat()
          let nodesBak = data.nodes.concat()

          //将数据整理为树状结构
          nodesBak.forEach(function (d) {
            if (d.index === 0) {
              let temp = {
                name: d.name,
                id: d.id,
                color: d.color,
                group: d.group,
                type: d.type,
                children: []
              }

              let pos = {}
              let tree = []
              edgesBak.forEach(function (edge) {
                if (edge.target === d.index) {
                  tree.push({
                    name: data.nodes[edge.source].name,
                    id: data.nodes[edge.source].id,
                    color: data.nodes[edge.source].color,
                    group: data.nodes[edge.source].group,
                    type: data.nodes[edge.source].type,
                    children: []
                  })
                  pos[edge.source] = [tree.length - 1]
                } else {
                  let posArr = pos[edge.target]
                  if (posArr !== undefined) {
                    let obj = tree[posArr[0]]
                    for (let j = 1; j < posArr.length; j++) {
                      obj = obj.children[posArr[j]]
                    }
                    obj.children.push({
                      name: data.nodes[edge.source].name,
                      id: data.nodes[edge.source].id,
                      color: data.nodes[edge.source].color,
                      group: data.nodes[edge.source].group,
                      type: data.nodes[edge.source].type,
                      children: []
                    })
                    pos[edge.source] = posArr.concat([obj.children.length - 1])
                  }
                }
              })
              temp.children = tree
              dataTree = temp
            }
          })
        }

        return (
          <div>
            <Row gutter={10}>
              <Col md={24}>
                <div className="bar1">
                  <Row>
                    <Col span={6} offset={8}>
                      <Input
                        placeholder="请输入实体名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                          <Tooltip title="请输入繁体字">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }

                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                      />
                    </Col>
                    <Col span={2}>
                      <Button type="primary" onClick={this.handleClick}>搜索</Button>
                    </Col>
                  </Row>
                </div>
                <div>
                  <div className="gutter-box-timeline">
                    <Card title="CBDB人物关系网络" bordered={false}
                      style={{ height: '800px', width: '100%' }}>
                      <Row>
                        <Col span={10}>
                          <RadioGroup onChange={this.getRelation} value={this.state.isRadio}>
                            <Radio value={1}>社交关系</Radio>
                            <Radio value={2}>亲属关系</Radio>
                            <Radio value={3}>所有关系</Radio>
                          </RadioGroup>
                        </Col>
                        <Col span={2} className="slider-text">关系值:</Col>
                        <Col span={10}>
                          <Slider range min={0} max={this.state.maxRelationValue}
                            onChange={this.handleChange}
                            marks={this.state.marks}
                            step={null}
                            defaultValue={this.state.relationValue}
                            style={{ margin: 5 }} />
                        </Col>
                      </Row>
                      {/* <D3SimpleForceChart types={types} dataTree={dataTree}
                                                        nameHandler={this.nameHandler.bind(this)}/> */}
                    </Card>
                  </div>

                  <div className="info-div">
                    <div>
                      <Card title="官员生平信息表" style={{ height: '350px' }}>
                        <div className="table-basic-div">
                          <table>
                            <thead>
                              <tr>
                                <th>属性</th>
                                <th>属性值</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>姓名</td>
                                <td>{mpName}</td>
                              </tr>
                              <tr>
                                <td>别号</td>
                                <td>{basicInfo.aliasName}</td>
                              </tr>
                              <tr>
                                <td>朝代</td>
                                <td>{basicInfo.dynasty}</td>
                              </tr>
                              <tr>
                                <td>生年</td>
                                <td>{basicInfo.yearBirth}</td>
                              </tr>
                              <tr>
                                <td>卒年</td>
                                <td>{basicInfo.yearDeath}</td>
                              </tr>
                              <tr>
                                <td>籍贯</td>
                                <td>{basicInfo.addrName}</td>
                              </tr>
                              <tr>
                                <td>入仕途径</td>
                                <td>{basicInfo.ruShiDoor}</td>
                              </tr>
                              <tr>
                                <td>入仕类别</td>
                                <td>{basicInfo.ruShiType}</td>
                              </tr>
                              <tr>
                                <td>入仕时间</td>
                                <td>{basicInfo.ruShiYear}</td>
                              </tr>
                              <tr>
                                <td>社会地位</td>
                                <td>{basicInfo.statusName}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    </div>

                    <div>
                      <Card title="官员任职信息表" style={{ height: '450px' }}>
                        <div className="table-post-div">
                          <Table columns={columns} dataSource={postPersons} />
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    }
  }
}