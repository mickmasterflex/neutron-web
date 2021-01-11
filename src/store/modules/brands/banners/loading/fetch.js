
const state = {
  brand_banners_fetch_loading: false,
  brand_banners_fetch_loading_text: 'Loading Brand Banners'
}

const getters = {
  getBrandBannersFetchLoading: state => state.brand_banners_fetch_loading,
  getBrandBannersFetchLoadingText: state => state.brand_banners_fetch_loading_text
}

const mutations = {
  SET_BRAND_BANNERS_FETCH_LOADING: (state) => (state.brand_banners_fetch_loading = true),
  RESET_BRAND_BANNERS_FETCH_LOADING: (state) => (state.brand_banners_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
