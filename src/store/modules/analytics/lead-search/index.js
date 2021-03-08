import axios from '@/axios'
import loading from '@/store/modules/analytics/lead-search/loading'

const modules = {
  loading
}

const state = {
  lead_search_results: []
}

const getters = {
  getLeadSearchResults: state => state.lead_search_results
}

const actions = {
  async searchLeads ({ commit, getters }, data) {
    commit('RESET_LEAD_SEARCH_RESULTS')
    commit('SET_LEAD_SEARCH_LOADING')
    await axios.post('/analytics/lead-search/', data, { showSuccessToast: false })
      .then(response => {
        commit('SET_LEAD_SEARCH_RESULTS', response.data)
      }).finally(() => {
        commit('RESET_LEAD_SEARCH_LOADING')
      })
  }
}

const mutations = {
  SET_LEAD_SEARCH_RESULTS: (state, leads) => (state.lead_search_results = leads),
  RESET_LEAD_SEARCH_RESULTS: (state) => (state.lead_search_results = {})
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
