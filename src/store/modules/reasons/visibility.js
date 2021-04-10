
const state = {
  show_create_reason_modal: false,
  show_update_reason_modal: false
}

const getters = {
  getShowCreateReasonModal: state => state.show_create_reason_modal,
  getShowUpdateReasonModal: state => state.show_update_reason_modal
}

const actions = {
  async showReasonsCreateUpdateModal ({ commit }, type) {
    if (type === 'create') {
      commit('SHOW_CREATE_REASON_MODAL')
      commit('CLOSE_UPDATE_REASON_MODAL')
    }
    if (type === 'update') {
      commit('SHOW_UPDATE_REASON_MODAL')
      commit('CLOSE_CREATE_REASON_MODAL')
    }
  }
}

const mutations = {
  SHOW_CREATE_REASON_MODAL: (state) => (state.show_create_reason_modal = true),
  CLOSE_CREATE_REASON_MODAL: (state) => (state.show_create_reason_modal = false),
  SHOW_UPDATE_REASON_MODAL: (state) => (state.show_update_reason_modal = true),
  CLOSE_UPDATE_REASON_MODAL: (state) => (state.show_update_reason_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
