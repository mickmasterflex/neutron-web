
const state = {
  show_create_brand_modal: false
}

const getters = {
  getShowCreateBrandModal: state => state.show_create_brand_modal
}

const mutations = {
  SHOW_CREATE_BRAND_MODAL: (state) => (state.show_create_brand_modal = true),
  CLOSE_CREATE_BRAND_MODAL: (state) => (state.show_create_brand_modal = false)
}

export default {
  state,
  getters,
  mutations
}
