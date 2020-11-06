const state = {
  show_create_buyer_group_form: false,
  show_update_buyer_group_modal: false
}

const getters = {
  getShowCreateBuyerGroupForm: state => state.show_create_buyer_group_form,
  getShowUpdateBuyerGroupModal: state => state.show_update_buyer_group_modal
}

const mutations = {
  SHOW_CREATE_BUYER_GROUP_FORM: (state) => (state.show_create_buyer_group_form = true),
  CLOSE_CREATE_BUYER_GROUP_FORM: (state) => (state.show_create_buyer_group_form = false),
  SHOW_UPDATE_BUYER_GROUP_MODAL: (state) => (state.show_update_buyer_group_modal = true),
  CLOSE_UPDATE_BUYER_GROUP_MODAL: (state) => (state.show_update_buyer_group_modal = false)
}

export default {
  state,
  getters,
  mutations
}
