const state = {
  current_stats_contracts: []
}

const getters = {
  getCurrentStatsContractsParentless: state => state.current_stats_contracts.filter(contract => contract.parent === null),
  getCurrentStatsContractsByParent: (state) => (contractId) => {
    return state.current_stats_contracts.filter(contract => {
      if (contract.parent) {
        return contract.parent.id === contractId
      }
    })
  }
}

const actions = {
  async setCurrentContractData ({ commit }, data) {
    commit('SET_CURRENT_STATS_CONTRACTS', data.descendants)
    commit('SET_ANALYTICS_TOTALS', data.totals)
    commit('SET_ANALYTICS_LEADS', data.leads)
    commit('SET_CURRENT_CONTRACT_STATS', data.contract)
    commit('SET_CURRENT_CLIENT_STATS', data.client)
  }
}

const mutations = {
  SET_CURRENT_STATS_CONTRACTS: (state, contracts) => (state.current_stats_contracts = contracts)
}

export default {
  state,
  getters,
  actions,
  mutations
}
