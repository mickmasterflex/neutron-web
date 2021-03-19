import buyer from './buyer'
import partner from './partner'
import contracts from './contracts'

const modules = {
  buyer,
  partner,
  contracts
}

const state = {
  current_contract_stats: {}
}

const getters = {
  getCurrentContractStats: state => state.current_contract_stats
}

const mutations = {
  SET_CURRENT_CONTRACT_STATS: (state, client) => (state.current_contract_stats = client)
}

export default {
  modules,
  state,
  getters,
  mutations
}
