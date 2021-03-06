import axios from '@/axios'
import loading from './loading'

const modules = {
  loading
}

const state = {
  current_fpi: null
}

const getters = {
  getCurrentFpi: state => state.current_fpi
}

const actions = {
  async fetchCurrentFpi ({ commit }, contractId) {
    commit('SET_FETCH_FPI_LOADING')
    await axios.get(`/fpi-download/?contract=${contractId}`)
      .then(response => {
        commit('SET_CURRENT_FPI', response.data)
      }).finally(() => {
        commit('RESET_FETCH_FPI_LOADING')
      })
  },
  async fetchFpiCSV ({ commit, getters }, data) {
    commit('SET_FETCH_FPI_DOWNLOADING')
    await axios({
      url: `/fpi-download/?contract=${data.id}&csv_download=True&`,
      responseType: 'blob',
      method: 'GET'
    }).then(response => {
      const linkUrl = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = linkUrl
      link.download = data.filename + '.csv'
      link.click()
      URL.revokeObjectURL(link.href)
    }).finally(() => {
      commit('RESET_FETCH_FPI_DOWNLOADING')
    })
  }
}

const mutations = {
  SET_CURRENT_FPI: (state, fpi) => (state.current_fpi = fpi),
  RESET_CURRENT_FPI: (state) => (state.current_fpi = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
