
const state = {
  brand_logos_fetch_loading: false,
  brand_logos_fetch_loading_text: 'Loading Brand Logos'
}

const getters = {
  getBrandLogosFetchLoading: state => state.brand_logos_fetch_loading,
  getBrandLogosFetchLoadingText: state => state.brand_logos_fetch_loading_text
}

const mutations = {
  SET_BRAND_LOGOS_FETCH_LOADING: (state) => (state.brand_logos_fetch_loading = true),
  RESET_BRAND_LOGOS_FETCH_LOADING: (state) => (state.brand_logos_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
