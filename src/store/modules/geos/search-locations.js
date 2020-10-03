import axios from '@/axios'

const state = {
  locations_search_results: {}
}

const getters = {
  getLocationsSearchResults: state => state.locations_search_results
}

const actions = {
  async searchLocations ({ commit }, searchParams) {
    await axios.get(`/geo-search-locations/?geo=${searchParams.geo}&locations=${searchParams.locations}`)
      .then(response => {
        commit('SET_LOCATIONS_SEARCH_RESULTS', response.data)
      })
  }
}

const mutations = {
  SET_LOCATIONS_SEARCH_RESULTS: (state, results) => (state.locations_search_results = results)
}

export default {
  state,
  getters,
  actions,
  mutations
}
