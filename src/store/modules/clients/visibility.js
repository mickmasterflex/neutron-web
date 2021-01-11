
const state = {
  show_create_client_modal: false
}

const getters = {
  getShowCreateClientModal: state => state.show_create_client_modal
}

const mutations = {
  SHOW_CREATE_CLIENT_MODAL: (state) => (state.show_create_client_modal = true),
  CLOSE_CREATE_CLIENT_MODAL: (state) => (state.show_create_client_modal = false)
}

export default {
  state,
  getters,
  mutations
}
