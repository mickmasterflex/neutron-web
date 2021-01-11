
const state = {
  show_create_user_modal: false
}

const getters = {
  getShowCreateUserModal: state => state.show_create_user_modal
}

const mutations = {
  SHOW_CREATE_USER_MODAL: (state) => (state.show_create_user_modal = true),
  CLOSE_CREATE_USER_MODAL: (state) => (state.show_create_user_modal = false)
}

export default {
  state,
  getters,
  mutations
}
