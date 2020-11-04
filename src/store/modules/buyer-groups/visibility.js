const state = {
  show_create_buyer_group_form: false
}

const getters = {
  getShowCreateBuyerGroupForm: state => state.show_create_buyer_group_form
}

const mutations = {
  SHOW_CREATE_BUYER_GROUP_FORM: (state) => (state.show_create_buyer_group_form = true),
  HIDE_CREATE_BUYER_GROUP_FORM: (state) => (state.show_create_buyer_group_form = false)
}

export default {
  state,
  getters,
  mutations
}
