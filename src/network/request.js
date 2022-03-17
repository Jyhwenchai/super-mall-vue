import axios from 'axios'

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  instance.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    console.log(error)
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    console.log(error)
  })

  return instance(config)
}
