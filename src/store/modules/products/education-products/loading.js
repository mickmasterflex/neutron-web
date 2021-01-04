
const state = {
  education_product_fetch_loading: false,
  education_products_fetch_loading: false,
  education_product_fetch_loading_text: 'Loading Education Product',
  education_products_fetch_loading_text: 'Loading Education Products'
}

const getters = {
  getEducationProductFetchLoading: state => state.education_product_fetch_loading,
  getEducationProductsFetchLoading: state => state.education_products_fetch_loading,
  getEducationProductFetchLoadingText: state => state.education_product_fetch_loading_text,
  getEducationProductsFetchLoadingText: state => state.education_products_fetch_loading_text
}

const mutations = {
  SET_EDUCATION_PRODUCT_FETCH_LOADING: (state) => (state.education_product_fetch_loading = true),
  SET_EDUCATION_PRODUCTS_FETCH_LOADING: (state) => (state.education_products_fetch_loading = true),
  RESET_EDUCATION_PRODUCT_FETCH_LOADING: (state) => (state.education_product_fetch_loading = false),
  RESET_EDUCATION_PRODUCTS_FETCH_LOADING: (state) => (state.education_products_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
