const state = {
  current_contract_ancestors: []
}

const getters = {
  getCurrentContractAncestors: state => state.current_contract_ancestors,
  getCurrentContractAncestorsIds: state => state.current_contract_ancestors.map(a => a.id)
}

const mutations = {
  SET_CURRENT_CONTRACT_ANCESTORS: (state, ancestors) => (state.current_contract_ancestors = ancestors),
  RESET_CURRENT_CONTRACT_ANCESTORS: (state) => (state.current_contract_ancestors = [])
}

export default {
  state,
  getters,
  mutations
}
