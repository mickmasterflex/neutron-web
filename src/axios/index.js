import Axios from 'axios'
import router from '@/router'
import { successfulToast, failedToast } from '@/mixins/toastMessages'

const development = process.env.NODE_ENV !== 'production'

const axios = Axios.create({
  baseURL: development ? 'http://127.0.0.1:8000/api' : 'https://neutron.neutroninteractive.com/api'
})

axios.interceptors.response.use(response => {
  window.console.log(process.env.NODE_ENV)
  if (response.config.showSuccessToast !== false) {
    if (response.config.method === 'post' && response.statusText === 'Created') {
      successfulToast({ heading: response.statusText + ' successfully' })
    }
    if (response.config.method === 'put') {
      successfulToast({ heading: 'Updated successfully' })
    }
    if (response.config.method === 'delete') {
      successfulToast({ icon: 'trash-alt', heading: 'Deleted successfully' })
    }
  }
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (error.response.config && !error.response.config.__isRetryRequest) {
          this.logout()
        }
        break
      case 404:
        if (error.response.config.method === 'get') {
          router.push({ name: '404' })
        } else {
          failedToast({ heading: error.message, content: error.response.config.url })
        }
        break
      case 400:
        failedToast({ heading: error.message })
        return Promise.reject(error)
      case 500:
        failedToast({ heading: error.message, content: error.response.statusText })
        break
      default:
        failedToast({ heading: error.message })
    }
  } else {
    failedToast({ heading: error.message })
  }
  return Promise.reject(error)
})

export default axios
