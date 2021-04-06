import axios from '@/axios'

const state = {
  partner_contract_stats_fetch_loading_text: 'Loading Partner Contract Data'
}

const actions = {
  async fetchPartnerContractStats ({ commit, getters, dispatch }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/campaigns/?${getters.getAnalyticsDateRangeUrlFormatted}&partner_contract=${id}`)
      .then(response => {
        commit('SET_CURRENT_STATS_CAMPAIGNS', response.data.campaigns)
        commit('SET_CURRENT_ANCESTORS', response.data.ancestors)
        dispatch('setCurrentContractData', response.data)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchPartnerContractLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'partnerContract-' + id,
      url: `/analytics/campaigns/?partner_contract=${id}`
    })
  }
}

export default {
  state,
  actions
}
