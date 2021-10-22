/**  * 封装Axios  * 处理请求、响应错误信息  */
import axios from 'axios' // 引用axios  
const baseURL = 'https://qmdj.api.qiacdn.com:8443'
const serve = axios.create({
  baseURL: baseURL,
  // nginx转发到后端Springboot 
  // withCredentials: true,
  // send cookies when cross-domain requests 
  headers:{'Content-Type': 'application/json;charset=UTF-8'},
  timeout: 5000
  // request timeout
})


serve.interceptors.request.use(config => {
  // do something before request is sent  
  //
  // console.log('路由',config.url);
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'

  // 私有方法带TOKEN
  const takeTokenUrl = []
  if(process.client && takeTokenUrl.includes(config.url) && localStorage && localStorage.getItem('userInfo')) {
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    if (token) request.headers.token = `${token}`
  }
  return config
}, error => {
  // do something with request error 
  console.log(error)
  // for debug  
  return Promise.reject(error)
}) // response interceptor 
serve.interceptors.response.use(
/**  * If you want to get http information such as headers or status  * Please return  response => response  */
/**  * Determine the request status by custom code  * Here is just an example  * You can also judge the status by HTTP Status Code  */

response => {
  const res = response.data
  //res is my own data  
  if (res.code === 0) {
    return Promise.resolve(res)
  }
  else{
    return Promise.reject(new Error(res.display || 'Error'))
  }
},
error => {
  console.log('err' + error) // for debug
  Message({ message: error.message, type: 'error', duration: 5 * 1000 })
  return Promise.reject(error)
})
export default serve

// export default function(app) {
//   const axios = app.$axios
//   console.log(axios);
//   axios.defaults.timeout = 5000
//   axios.defaults.baseURL = 'https://qmdj.api.qiacdn.com:8443'
//   axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'} 
//   axios.interceptors.request.use(config => {

//     return config
//   })
//   axios.interceptors.respone.use(respone =>{
//     const res = response.data
//     if(res.code === 0) {
//       console.log('请求成功！');
//     } else {
//       // return Promise.reject(new Error(res.display || 'Error'))
//     }
//   },
//   error => {
//     return Promise.reject(error)
//   })
// }