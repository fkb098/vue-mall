import axios from 'axios'
import {SUCC_CODE,TIME_OUT} from './config'
import {getHomeRecommend} from './home'
const CancelToken = axios.CancelToken
let cancel


export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次的请求')
  cancel = null

  return axios.get(`http://www.imooc.com/api/category/content/${id}`,{
    timeout:TIME_OUT,
    cancelToken:new CancelToken(function executor(c) {
      cancel = c
    })
  }).then(res=>{
    if(res.data.code === SUCC_CODE){
      return res.data.content
    }
    throw new Error ('没有成功获取数据')
  }).catch(err=>{
    if(axios.isCancel(err)){
      console.log(err)
    }else{
      console.log(err.console)
    }
  })
}

