import axios from '@/axios'
import loading from '@/store/modules/analytics/lead-search/loading'

const modules = {
  loading
}

const state = {
  lead_data_search_loading_text: 'Loading Campaign Contracts Data'
}

const actions = {
  async searchLeads ({ commit, getters }, data) {
    commit('SET_LEAD_SEARCH_LOADING')
    await axios.post('/analytics/lead-search/', data, { showSuccessToast: false })
      .then(response => {
        commit('SET_ANALYTICS_LEADS', response.data)
      }).finally(() => {
        commit('RESET_LEAD_SEARCH_LOADING')
      })
  }
}

export default {
  modules,
  state,
  actions
}
