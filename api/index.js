import axios from 'axios'
import qs from 'qs'

axios.create({
  timeout: 1000,
})

axios.defaults.headers['X-Juejin-Src'] = 'web'

axios.interceptors.request.use( (config) => {
  console.log(config)
  // 在发送请求之前做些什么
  if (isLogin) {
    if (config.method == 'post') {
      config.data = {
        ...config.data,
        device_id: userInfo.clientId,
        uid: userInfo.uid,
        token: userInfo.token,
        current_uid: userInfo.uid
      }
    } else {
      config.headers = {
        ...config.headers,
        'X-Juejin-Client': userInfo.clientId,
        'X-Juejin-Token': userInfo.token,
        'X-Juejin-Uid': userInfo.uid
      }
    }
  }
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const operateUrl = (args) => {
  let temp = isLogin ? `src=web&device_id=${userInfo.clientId}&uid=${userInfo.uid}&client_id=${userInfo.clientId}` : 'src=web'
  for (let i in args) {
    temp += `&${i}=${args[i] || ''}`
  }
  return temp
}

const API = (method, url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (method == 'post') {
      axios({method: 'post', url: url, data: options})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.status)
      })
    } else {
      axios({method: method, url: `${url}?${operateUrl(Object.assign({}, userInfo, options))}`})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err.response)
        reject(err.response.status)
      })
    }
  })
}

export default API