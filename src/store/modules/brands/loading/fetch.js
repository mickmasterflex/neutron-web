
const state = {
  brand_fetch_loading: false,
  brands_fetch_loading: false,
  brand_fetch_loading_text: 'Loading Brand Data',
  brands_fetch_loading_text: 'Loading Brands'
}

const getters = {
  getBrandFetchLoading: state => state.brand_fetch_loading,
  getBrandsFetchLoading: state => state.brands_fetch_loading,
  getBrandFetchLoadingText: state => state.brand_fetch_loading_text,
  getBrandsFetchLoadingText: state => state.brands_fetch_loading_text
}

const mutations = {
  SET_BRANDS_FETCH_LOADING: (state) => (state.brands_fetch_loading = true),
  RESET_BRANDS_FETCH_LOADING: (state) => (state.brands_fetch_loading = false),
  SET_BRAND_FETCH_LOADING: (state) => (state.brand_fetch_loading = true),
  RESET_BRAND_FETCH_LOADING: (state) => (state.brand_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
