import axios from '@/axios'

const state = {
  locations_search_results: {}
}

const getters = {
  getLocationsSearchResults: state => state.locations_search_results
}

const actions = {
  async searchLocations ({ commit }, searchParams) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.get(`/geo-search-locations/?geo=${searchParams.geo}&locations=${searchParams.locations}`)
      .then(response => {
        commit('SET_LOCATIONS_SEARCH_RESULTS', response.data)
      })
      .catch(() => {
        commit('RESET_LOCATIONS_SEARCH_RESULTS')
      })
      .finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}

const mutations = {
  SET_LOCATIONS_SEARCH_RESULTS: (state, results) => (state.locations_search_results = results),
  RESET_LOCATIONS_SEARCH_RESULTS: (state) => (state.locations_search_results = {})
}

export default {
  state,
  getters,
  actions,
  mutations
}
