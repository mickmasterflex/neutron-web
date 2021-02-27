import axios from '@/axios'
import loading from '@/store/modules/analytics/lead-search/loading'

const modules = {
  loading
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
  actions
}
