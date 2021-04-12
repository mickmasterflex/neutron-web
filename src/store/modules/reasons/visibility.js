
const state = {
  show_create_update_reason_modal: false,
  create_update_reason_modal_purpose: ''
}

const getters = {
  getShowCreateUpdateReasonModal: state => state.show_create_update_reason_modal,
  getCreateUpdateReasonModalPurpose: state => state.create_update_reason_modal_purpose,
  getCreateUpdateReasonModalPurposeIsUpdate: state => state.create_update_reason_modal_purpose === 'update'
}

const actions = {
  async showReasonsCreateUpdateModal ({ commit }, type) {
    if (!['create', 'update'].includes(type)) {
      const error = new Error('type must be equal to create or update')
      window.console.log(error)
    }
    commit('SET_CREATE_UPDATE_REASON_MODAL_PURPOSE', type)
    commit('SHOW_CREATE_UPDATE_REASON_MODAL')
  }
}

const mutations = {
  SHOW_CREATE_UPDATE_REASON_MODAL: (state) => (state.show_create_update_reason_modal = true),
  CLOSE_CREATE_UPDATE_REASON_MODAL: (state) => (state.show_create_update_reason_modal = false),
  SET_CREATE_UPDATE_REASON_MODAL_PURPOSE: (state, purpose) => (state.create_update_reason_modal_purpose = purpose)
}

export default {
  state,
  getters,
  actions,
  mutations
}
