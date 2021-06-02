
const state = {
  campus_banners_fetch_loading: false,
  campus_banners_fetch_loading_text: 'Loading Campus Banners'
}

const getters = {
  getCampusBannersFetchLoading: state => state.campus_banners_fetch_loading,
  getCampusBannersFetchLoadingText: state => state.campus_banners_fetch_loading_text
}

const mutations = {
  SET_CAMPUS_BANNERS_FETCH_LOADING: (state) => (state.campus_banners_fetch_loading = true),
  RESET_CAMPUS_BANNERS_FETCH_LOADING: (state) => (state.campus_banners_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
