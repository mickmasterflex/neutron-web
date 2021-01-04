
const state = {
  product_fetch_loading: false,
  products_fetch_loading: false,
  product_fetch_loading_text: 'Loading Product',
  products_fetch_loading_text: 'Loading Products'
}

const getters = {
  getProductFetchLoading: state => state.product_fetch_loading,
  getProductsFetchLoading: state => state.products_fetch_loading,
  getProductFetchLoadingText: state => state.product_fetch_loading_text,
  getProductsFetchLoadingText: state => state.products_fetch_loading_text
}

const mutations = {
  SET_PRODUCT_FETCH_LOADING: (state) => (state.product_fetch_loading = true),
  SET_PRODUCTS_FETCH_LOADING: (state) => (state.products_fetch_loading = true),
  RESET_PRODUCT_FETCH_LOADING: (state) => (state.product_fetch_loading = false),
  RESET_PRODUCTS_FETCH_LOADING: (state) => (state.products_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
