import loading from '@/store/modules/forms/base-fields/used-base-fields/loading'

const state = {
  contract_fields_panel_visible: true,
  used_base_fields_panel_visible: false
}

const actions = {
  showContractFieldsPanel: ({ commit }) => {
  },
  showUsedBaseFieldsPanel: ({ commit }) => {
    commit('RESET_USED_BASE_FIELDS')
    commit('RESET_USED_BASE_FIELDS_FORMS')
    commit('SET_FETCH_USED_BASE_FIELDS_LOADING')
  }
}

const getters = {
  getContractFieldsPanelVisible: state => state.contract_fields_panel_visible,
  getUsedBaseFieldsPanelVisible: state => state.used_base_fields_panel_visible
}

const mutations = {
  SET_CONTRACT_FIELDS_VISIBLE: (state) => (state.contract_fields_panel_visible = true),
  SET_USED_BASE_FIELDS_VISIBLE: (state) => (state.used_base_fields_panel_visible = true)
}

const modules = {
  loading
}

export default {
  state,
  actions,
  getters,
  mutations,
  modules
}
