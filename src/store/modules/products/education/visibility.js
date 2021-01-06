
const state = {
  show_create_education_product_modal: false
}

const getters = {
  getShowCreateEducationProductModal: state => state.show_create_education_product_modal
}

const mutations = {
  SHOW_CREATE_EDUCATION_PRODUCT_MODAL: (state) => (state.show_create_education_product_modal = true),
  CLOSE_CREATE_EDUCATION_PRODUCT_MODAL: (state) => (state.show_create_education_product_modal = false)
}

export default {
  state,
  getters,
  mutations
}
