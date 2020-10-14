import axios from '@/axios'

const state = {
  download_current_locations_loading: false
}

const getters = {
  getDownloadLocationsLoading: state => state.download_current_locations_loading
}

const actions = {
  async downloadCurrentLocations ({ commit }, geo) {
    commit('SET_DOWNLOAD_LOCATIONS_LOADING')
    await axios({
      url: `/geo-download-locations/?geo=${geo}`,
      responseType: 'blob',
      method: 'GET'
    }).then(response => {
      const url = window.URL.createObjectURL(response.data)
      window.open(url, '_blank')
      commit('UNSET_DOWNLOAD_LOCATIONS_LOADING')
    })
  }
}

const mutations = {
  SET_DOWNLOAD_LOCATIONS_LOADING: (state) => (state.download_current_locations_loading = true),
  UNSET_DOWNLOAD_LOCATIONS_LOADING: (state) => (state.download_current_locations_loading = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
