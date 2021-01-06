
const state = {
  contract_relations_fetch_loading: false,
  contract_relations_fetch_loading_text: 'Loading Contract Relations'
}

const getters = {
  getContractRelationsFetchLoading: state => state.contract_relations_fetch_loading,
  getContractRelationsFetchLoadingText: state => state.contract_relations_fetch_loading_text
}

const mutations = {
  SET_CONTRACT_RELATIONS_FETCH_LOADING: (state) => (state.contract_relations_fetch_loading = true),
  RESET_CONTRACT_RELATIONS_FETCH_LOADING: (state) => (state.contract_relations_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
