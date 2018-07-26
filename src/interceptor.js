import axios from 'axios'
import {
  Toast
} from 'vant'
// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://172.23.100.110:8080/'
// axios.defaults.baseURL = 'http://weixin.faqrobot.net'
axios.defaults.baseURL = 'http://siemenslp.faqrobot.cn'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `token`
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if ((response.data.status !== 0) && response.data.status) {
      Toast(response.data.message);
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  
);

export default axios;
