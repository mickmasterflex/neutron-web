
const state = {
  show_create_delivery_modal: false,
  show_update_delivery_modal: false
}

const getters = {
  getShowCreateDeliveryModal: state => state.show_create_delivery_modal,
  getShowUpdateDeliveryModal: state => state.show_update_delivery_modal
}

const mutations = {
  CLOSE_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = false),
  CLOSE_UPDATE_DELIVERY_MODAL: (state) => (state.show_update_delivery_modal = false),
  SHOW_CREATE_DELIVERY_MODAL: (state) => (state.show_create_delivery_modal = true),
  SHOW_UPDATE_DELIVERY_MODAL: (state) => (state.show_update_delivery_modal = true)
}

export default {
  state,
  getters,
  mutations
}
