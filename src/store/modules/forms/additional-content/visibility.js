const state = {
  show_additional_form_content_modal: false,
  additional_form_content_modal_purpose: ''
}

const getters = {
  getShowAdditionalFormContentModal: state => state.show_additional_form_content_modal,
  getAdditionalFormContentModalPurpose: state => state.additional_form_content_modal_purpose,
  getAdditionalFormContentModalPurposeIsUpdate: state => state.additional_form_content_modal_purpose === 'update'
}

const actions = {
  async showAdditionalFormContentModal ({ commit }, type) {
    if (!['add', 'update'].includes(type)) {
      const error = new Error('type must be equal to add or update')
      window.console.log(error)
    }
    commit('SET_ADDITIONAL_FORM_CONTENT_MODAL_PURPOSE', type)
    commit('SHOW_ADDITIONAL_FORM_CONTENT_MODAL')
  }
}

const mutations = {
  SHOW_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_additional_form_content_modal = true),
  CLOSE_ADDITIONAL_FORM_CONTENT_MODAL: (state) => (state.show_additional_form_content_modal = false),
  SET_ADDITIONAL_FORM_CONTENT_MODAL_PURPOSE: (state, purpose) => (state.additional_form_content_modal_purpose = purpose)
}

export default {
  state,
  getters,
  actions,
  mutations
}
