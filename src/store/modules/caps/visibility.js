const state = {
  show_caps_modal: false
}

const getters = {
  getShowCapsModal: state => (state.show_caps_modal)
}

const mutations = {
  SHOW_CAPS_MODAL: (state) => (state.show_caps_modal = true),
  CLOSE_CAPS_MODAL: (state) => (state.show_caps_modal = false)
}

export default {
  state,
  getters,
  mutations
}
