const state = {
  contract_fields_panel_visible: true,
  used_base_fields_panel_visible: false
}

const actions = {
  showContractFieldsPanel: ({ commit }) => {
    commit('SET_CONTRACT_FIELDS_VISIBLE')
    commit('UNSET_USED_BASE_FIELDS_VISIBLE')
  },
  showUsedBaseFieldsPanel: ({ commit }) => {
    commit('SET_USED_BASE_FIELDS_VISIBLE')
    commit('UNSET_CONTRACT_FIELDS_VISIBLE')
  }
}

const getters = {
  getContractFieldsPanelVisible: state => state.contract_fields_panel_visible,
  getUsedBaseFieldsPanelVisible: state => state.used_base_fields_panel_visible
}

const mutations = {
  SET_CONTRACT_FIELDS_VISIBLE: (state) => (state.contract_fields_panel_visible = true),
  SET_USED_BASE_FIELDS_VISIBLE: (state) => (state.used_base_fields_panel_visible = true),
  UNSET_CONTRACT_FIELDS_VISIBLE: state => (state.contract_fields_panel_visible = false),
  UNSET_USED_BASE_FIELDS_VISIBLE: state => (state.used_base_fields_panel_visible = false)
}

export default {
  state,
  actions,
  getters,
  mutations
}
