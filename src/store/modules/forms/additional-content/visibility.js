const state = {
  show_create_additional_form_content_modal: false,
  show_update_additional_form_content_modal: false
}

const getters = {
  getShowCreateAdditionalFormContentModal: state => state.show_create_additional_form_content_modal,
  getShowUpdateAdditionalFormContentModal: state => state.show_update_additional_form_content_modal
}

const actions = {
  async showAdditionalFormContentModal ({ commit }, type) {
    if (type === 'create') {
      commit('SHOW_CREATE_ADDITIONAL_FORM_CONTENT_MODAL')
      commit('CLOSE_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL')
    }
    if (type === 'update') {
      commit('SHOW_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL')
      commit('CLOSE_CREATE_ADDITIONAL_FORM_CONTENT_MODAL')
    }
  }
}

const mutations = {
  SHOW_CREATE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_create_additional_form_content_modal = true),
  CLOSE_CREATE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_create_additional_form_content_modal = false),
  SHOW_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_update_additional_form_content_modal = true),
  CLOSE_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_update_additional_form_content_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
