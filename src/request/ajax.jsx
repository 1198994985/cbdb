import axios from 'axios'
import { message } from 'antd'

const base = "http://47.97.217.209:8080/CBDB"
function request(url, data = {}, type = 'GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if (type === 'GET') { // 发GET请求
      promise = axios.get(url, { // 配置对象
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
      // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      message.error('请求出错了: ' + error.message)
      console.log('出错了')
    })
  })
}

// 获取热力图json数据
export const reqHeatMapTang = () => request(base + '/map?dynasty_flag=1', {}, 'GET')
export const reqHeatMapSong = () => request(base + '/map?dynasty_flag=2', {}, 'GET')
export const reqHeatMapYuan = () => request(base + '/map?dynasty_flag=3', {}, 'GET')
export const reqHeatMapMing = () => request(base + '/map?dynasty_flag=4', {}, 'GET')
export const reqHeatMapQing = () => request(base + '/map?dynasty_flag=5', {}, 'GET')


// 获取地图json数据
export const reqMapTang = () => request('Tang.json', {}, 'GET')
export const reqMapSong = () => request('Song.geojson', {}, 'GET')
export const reqMapYuan = () => request('Yuan.geojson', {}, 'GET')
export const reqMapMing = () => request('Ming.geojson', {}, 'GET')
export const reqMapQing = () => request('Qing.geojson', {}, 'GET')

// 请求地图省份对应的任务信息
export const reqAddressName = (address) => request(address, {}, 'GET')