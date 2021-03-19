const state = {
  current_stats_contracts: [],
  current_stats_descendant_contract_data: []
}

const getters = {
  getCurrentStatsContractsParentless: state => state.current_stats_contracts.filter(contract => contract.parent === null),
  getCurrentStatsDescendantContractDataById: (state) => (contractId) => {
    return state.current_stats_descendant_contract_data.filter(contract => contract.id === contractId)
  },
  getCurrentStatsContractsByParent: (state) => (contractId) => {
    return state.current_stats_contracts.filter(contract => contract.parent === contractId)
  }
}

const mutations = {
  SET_CURRENT_STATS_CONTRACTS: (state, contracts) => (state.current_stats_contracts = contracts),
  SET_CURRENT_STATS_DESCENDANT_CONTRACT_DATA: (state, contractData) => (state.current_stats_descendant_contract_data = contractData)
}

export default {
  state,
  getters,
  mutations
}
