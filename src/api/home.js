import axios from 'axios'
import jsonp from '../assets/js/jsonp'
import {SUCC_CODE, TIME_OUT, HOME_RECOMMEND_PAGE_SIZE, jsonOptions} from './config'


// 打乱数组的顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let rndNum

  //循环 当前索引不等于任意的索引 就结构赋值交换位置
  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]]
    }
  }

  return arr
}




// 获取幻灯片服务器数据————Ajax
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIME_OUT
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      let sliders = res.data.slider//原始幻灯片数据数组
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]]//包含一个图片的数组
      sliders = shuffle(sliders.filter(()=>Math.random() >= 0.5))//filter筛选50%的数据 真就保留 假就剔除
      // console.log(sliders)
      if(sliders.length === 0){
        sliders = slider
      }
      return sliders
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
    return [{
      linkUrl: 'https://www.imooc.com',
      picUrl: require('../assets/img/404.png')
    }]
  // }).then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data)
  //     }, 1000)
  //   })
  })
}

// 获取热门推荐数据--jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  }
  return jsonp(url, params, jsonOptions).then(res => {
    if (res.code === '200') {
      return res
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
    return [{
      linkUrl: 'https://www.imooc.com',
      picUrl: require('../assets/img/404.png')
    }]
  // }).then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data)
  //     }, 1000)
  //   })
  // })
  })}
