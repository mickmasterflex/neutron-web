
const state = {
  campus_fetch_loading: false,
  campuses_fetch_loading: false,
  campus_fetch_loading_text: 'Loading Campus Data',
  campuses_fetch_loading_text: 'Loading Campuses'
}

const getters = {
  getCampusFetchLoading: state => state.campus_fetch_loading,
  getCampusesFetchLoading: state => state.campuses_fetch_loading,
  getCampusFetchLoadingText: state => state.campus_fetch_loading_text,
  getCampusesFetchLoadingText: state => state.campuses_fetch_loading_text
}

const mutations = {
  SET_CAMPUSES_FETCH_LOADING: (state) => (state.campuses_fetch_loading = true),
  RESET_CAMPUSES_FETCH_LOADING: (state) => (state.campuses_fetch_loading = false),
  SET_CAMPUS_FETCH_LOADING: (state) => (state.campus_fetch_loading = true),
  RESET_CAMPUS_FETCH_LOADING: (state) => (state.campus_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
