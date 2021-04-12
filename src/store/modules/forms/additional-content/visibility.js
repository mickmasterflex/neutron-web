const state = {
  show_create_additional_form_content_modal: false,
  show_update_additional_form_content_modal: false,
  additional_form_content_modal_purpose: ''
}

const getters = {
  getShowCreateAdditionalFormContentModal: state => state.show_create_additional_form_content_modal,
  getShowUpdateAdditionalFormContentModal: state => state.show_update_additional_form_content_modal,
  getAdditionalFormContentModalPurpose: state => state.additional_form_content_modal_purpose
}

const actions = {
  async showAdditionalFormContentModal ({ commit }, type) {
    commit('SET_ADDITIONAL_FORM_CONTENT_MODAL_PURPOSE', type)
    if (type === 'add') {
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
  CLOSE_UPDATE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_update_additional_form_content_modal = false),
  SET_ADDITIONAL_FORM_CONTENT_MODAL_PURPOSE: (state, purpose) => (state.additional_form_content_modal_purpose = purpose)
}

export default {
  state,
  getters,
  actions,
  mutations
}
