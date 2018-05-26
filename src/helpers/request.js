import axios from 'axios';
import configBaseURL from './config-baseURL'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.baseURL = configBaseURL.baseURL;

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let config = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      },
      withCredentials: true
    }
    if (type.toLowerCase() === 'get') {
      config.params = data
    } else {
      config.data = data
    }
    axios(config).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        Message({
          type: 'error',
          message: res.data.msg
        });
        reject(res.data)
      }
    }).catch(err => {
      Message({
        type: 'error',
        message: 'error'
      });
      reject({msg: '网络异常'})
    })
  })
}
