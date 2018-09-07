import axios from 'axios';
import jsonp from '../assets/js/jsonp';
import {jsonOptions, TIME_OUT} from './config';

// 获取热门搜索数据--ajax
export const getSearchHotKeyword = () => {
  return axios.get('https://so.m.jd.com/ware/hotKeyWord.action?_format_=json', {
    // timeout: 10
    timeout: TIME_OUT
  }).then(res => {
    // console.log(res);
    res = JSON.parse(res.data.hotKeyWord);
    if (res && res.owner) { // succeed
      return res.owner;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};

// 获取搜索结果数据--jsonp
export const getSearchResult = keyword => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword, //传进来的搜素的关键词
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  // jsonpOptions.timeout = 100;

  return jsonp(url, params, jsonOptions).then(res => {
    // console.log(res);
    if (res.result) {
      // console.log(res);
      return res.result; //返回查询到的关键词数据
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
