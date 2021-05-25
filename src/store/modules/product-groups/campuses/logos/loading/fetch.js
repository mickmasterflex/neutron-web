
const state = {
  campus_logos_fetch_loading: false,
  campus_logos_fetch_loading_text: 'Loading Campus Logos'
}

const getters = {
  getCampusLogosFetchLoading: state => state.campus_logos_fetch_loading,
  getCampusLogosFetchLoadingText: state => state.campus_logos_fetch_loading_text
}

const mutations = {
  SET_CAMPUS_LOGOS_FETCH_LOADING: (state) => (state.campus_logos_fetch_loading = true),
  RESET_CAMPUS_LOGOS_FETCH_LOADING: (state) => (state.campus_logos_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
