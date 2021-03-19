import axios from '@/axios'

const state = {
  partner_contract_stats_fetch_loading_text: 'Loading Partner Contract Data'
}

const actions = {
  async fetchPartnerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/campaigns/?${getters.getAnalyticsDateRangeUrlFormatted}&partner_contract=${id}`)
      .then(response => {
        commit('SET_CURRENT_STATS_DESCENDANT_CONTRACT_DATA', response.data.descendant_contract_data)
        commit('SET_CURRENT_STATS_CONTRACTS', response.data.descendants)
        commit('SET_CURRENT_STATS_CAMPAIGNS', response.data.campaigns)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_CONTRACT_STATS', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
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
