const state = {
  show_create_injected_field_modal: false,
  show_update_injected_field_modal: false
}

const getters = {
  getShowCreateInjectedFieldModal: state => state.show_create_injected_field_modal,
  getShowUpdateInjectedFieldModal: state => state.show_update_injected_field_modal
}

const mutations = {
  SHOW_CREATE_INJECTED_FIELD_MODAL: (state) => (state.show_create_injected_field_modal = true),
  CLOSE_CREATE_INJECTED_FIELD_MODAL: (state) => (state.show_create_injected_field_modal = false),
  SHOW_UPDATE_INJECTED_FIELD_MODAL: (state) => (state.show_update_injected_field_modal = true),
  CLOSE_UPDATE_INJECTED_FIELD_MODAL: (state) => (state.show_update_injected_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
