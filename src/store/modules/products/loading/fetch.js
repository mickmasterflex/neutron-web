
const state = {
  products_fetch_loading: false
}

const getters = {
  getProductsFetchLoading: state => state.products_fetch_loading
}

const mutations = {
  SET_PRODUCTS_FETCH_LOADING: (state) => (state.products_fetch_loading = true),
  RESET_PRODUCTS_FETCH_LOADING: (state) => (state.products_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
