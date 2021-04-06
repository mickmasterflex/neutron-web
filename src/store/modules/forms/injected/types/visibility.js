const state = {
  show_update_injected_field_type_modal: false
}

const getters = {
  getShowUpdateInjectedFieldTypeModal: state => state.show_update_injected_field_type_modal
}

const mutations = {
  SHOW_CREATE_INJECTED_FIELD_TYPE_MODAL: (state) => (state.show_create_injected_field_type_modal = true),
  CLOSE_UPDATE_INJECTED_FIELD_TYPE_MODAL: (state) => (state.show_update_injected_field_type_modal = false),
  SHOW_UPDATE_INJECTED_FIELD_TYPE_MODAL: (state) => (state.show_update_injected_field_type_modal = true)
}

export default {
  state,
  getters,
  mutations
}
