import axios from 'axios'

export const http = {
  token: '',
  init() {
    axios.defaults.baseURL = '/api/int'

    let tokenMeta = document.head.querySelector('meta[name="jwt-token"]')

    if (tokenMeta) {
      axios.interceptors.request.use(config => {
        config.headers.Authorization = 'Bearer ' + tokenMeta.content

        return config
      })
    }
  },
  post(url, data, successCallback, errorCallback) {
    return axios.request({
      url,
      data,
      method: 'post'
    })
    .then(successCallback)
    .catch(errorCallback)
  },
  get(url, successCallback, errorCallback) {
    return axios.request({
      url,
      method: 'get'
    })
    .then(successCallback)
    .catch(errorCallback)
  }
}