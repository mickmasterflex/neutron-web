
const state = {
  show_create_buyer_modal: false
}

const getters = {
  getShowCreateBuyerModal: state => state.show_create_buyer_modal
}

const mutations = {
  SHOW_CREATE_BUYER_MODAL: (state) => (state.show_create_buyer_modal = true),
  CLOSE_CREATE_BUYER_MODAL: (state) => (state.show_create_buyer_modal = false)
}

export default {
  state,
  getters,
  mutations
}
